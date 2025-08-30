from flask import Blueprint, request, jsonify
from routes.auth_routes import admin_required
from db import get_connection
import oracledb
from datetime import datetime

purchase_bp = Blueprint("purchase_bp", __name__)


# add a purchase

@purchase_bp.route("/add_purchase", methods=["POST"])
@admin_required
def add_purchase():
    data = request.get_json()

    supplier_id = data.get("supplier_id")
    purchase_date = data.get("purchase_date")
    medicines = data.get("medicines", [])

    if not supplier_id or not medicines:
        return jsonify({"error": "Supplier ID and medicines are required"}), 400

    
    if purchase_date:
        try:
            purchase_date = datetime.strptime(purchase_date, "%Y-%m-%d")
        except ValueError:
            return jsonify({"error": "Invalid date format, use YYYY-MM-DD"}), 400

    # Extract arrays
    med_ids = [m["medicine_id"] for m in medicines]
    box_qtys = [m["box_quantity"] for m in medicines]
    units_per_box = [m["units_per_box"] for m in medicines]
    batch_nos = [m["batch_no"] for m in medicines]
    expiry_dates = [datetime.strptime(m["expiry_date"], "%Y-%m-%d") for m in medicines]
    cost_per_box = [m["cost_per_box"] for m in medicines]

    try:
        conn = get_connection()
        cur = conn.cursor()

        # Convert Python lists into Oracle collection types
        medicine_ids_arr = conn.gettype("SYS.ODCINUMBERLIST").newobject(med_ids)
        box_qtys_arr = conn.gettype("SYS.ODCINUMBERLIST").newobject(box_qtys)
        units_per_box_arr = conn.gettype("SYS.ODCINUMBERLIST").newobject(units_per_box)
        batch_nos_arr = conn.gettype("SYS.ODCIVARCHAR2LIST").newobject(batch_nos)
        expiry_dates_arr = conn.gettype("SYS.ODCIDATELIST").newobject(expiry_dates)
        cost_per_box_arr = conn.gettype("SYS.ODCINUMBERLIST").newobject(cost_per_box)

        
        cur.callproc("ADD_PURCHASE", [
            supplier_id,
            purchase_date,
            medicine_ids_arr,
            box_qtys_arr,
            units_per_box_arr,
            batch_nos_arr,
            expiry_dates_arr,
            cost_per_box_arr
        ])

        conn.commit()
        cur.close()
        conn.close()

        return jsonify({"message": "Purchase added successfully"}), 201

    except oracledb.DatabaseError as e:
        error_obj, = e.args
        return jsonify({"error": error_obj.message}), 500




# view all purchases


@purchase_bp.route("/all-purchases", methods=["GET"])
@admin_required
def get_purchases():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT p.purchase_id, p.supplier_id, s.name AS supplier_name, 
               p.purchase_date, p.total_amount
        FROM purchase p
        JOIN supplier s ON p.supplier_id = s.supplier_id
        ORDER BY p.purchase_date DESC
    """)
    result = [dict(zip([col[0] for col in cur.description], row)) for row in cur.fetchall()]
    cur.close()
    conn.close()
    return jsonify(result)



# details of a single purchase


@purchase_bp.route("/purchase-details/<int:purchase_id>", methods=["GET"])
@admin_required
def purchase_details(purchase_id):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT pd.purchase_detail_id,
               m.name,
               m.generic_name,
               m.category,
               m.dosage_form,
               pd.box_quantity,
               pd.units_per_box,
               pd.cost_per_box,
               pd.batch_no,
               pd.expiry_date,
               (pd.box_quantity * pd.cost_per_box) AS total_per_row
        FROM purchase_details pd
        JOIN medicine m ON pd.medicine_id = m.medicine_id
        WHERE pd.purchase_id = :purchase_id
        ORDER BY pd.purchase_detail_id
    """, [purchase_id])
    
    result = [dict(zip([col[0] for col in cur.description], row)) for row in cur.fetchall()]
    cur.close()
    conn.close()
    return jsonify(result)




# ------------------------- DELETE PURCHASE -------------------------



@purchase_bp.route('/delete-purchase', methods=['POST'])
@admin_required
def delete_purchase():
    data = request.json or {}
    purchase_id = data.get('purchase_id')

    if not purchase_id:
        return jsonify({"error": "purchase_id is required"}), 400

    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.callproc('DELETE_PURCHASE', [purchase_id])
        conn.commit()
        return jsonify({"message": "Purchase deleted successfully"}), 200
    except oracledb.DatabaseError as e:
        error_obj, = e.args
        return jsonify({"error": str(error_obj)}), 400
    finally:
        cursor.close()
        conn.close()

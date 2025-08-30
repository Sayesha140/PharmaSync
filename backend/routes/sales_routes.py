from flask import Blueprint, request, jsonify
from routes.auth_routes import admin_required
from db import get_connection
import oracledb
from datetime import datetime

sales_bp = Blueprint("sales_bp", __name__)

# ------------------------- ADD SALE -------------------------
@sales_bp.route("/add_sale", methods=["POST"])
@admin_required
def add_sale():
    data = request.get_json()
    medicines = data.get("medicines", [])
    discount_percent = data.get("discount_percent", 0)

    if not medicines:
        return jsonify({"error": "At least one medicine is required"}), 400

    med_ids = [m["medicine_id"] for m in medicines]
    quantities = [m["quantity"] for m in medicines]

    try:
        conn = get_connection()
        cur = conn.cursor()

        medicine_ids_arr = conn.gettype("SYS.ODCINUMBERLIST").newobject(med_ids)
        quantities_arr = conn.gettype("SYS.ODCINUMBERLIST").newobject(quantities)

        cur.callproc("ADD_SALE", [medicine_ids_arr, quantities_arr, discount_percent])
        conn.commit()

        return jsonify({"message": "Sale added successfully"}), 201

    except oracledb.DatabaseError as e:
        error_obj, = e.args
        return jsonify({"error": error_obj.message}), 500

    finally:
        cur.close()
        conn.close()


# ------------------------- GET ALL SALES -------------------------
@sales_bp.route("/all-sales", methods=["GET"])
#@admin_required
def get_sales():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT s.sale_id, s.sale_date, s.total_amount, 
               s.discount_percent, s.final_amount
        FROM sales s
        ORDER BY s.sale_date DESC
    """)
    result = [dict(zip([col[0] for col in cur.description], row)) for row in cur.fetchall()]
    cur.close()
    conn.close()
    return jsonify(result)


# ------------------------- GET SALE DETAILS -------------------------
@sales_bp.route("/sale-details/<int:sale_id>", methods=["GET"])
#@admin_required
def sale_details(sale_id):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT sd.sale_detail_id,
               m.name,
               m.generic_name,
               m.category,
               m.dosage_form,
               sd.quantity,
               sd.unit_price,
               sd.subtotal
        FROM sales_details sd
        JOIN inventory i ON sd.inventory_id = i.inventory_id
        JOIN medicine m ON i.medicine_id = m.medicine_id
        WHERE sd.sale_id = :sale_id
        ORDER BY sd.sale_detail_id
    """, [sale_id])
    result = [dict(zip([col[0] for col in cur.description], row)) for row in cur.fetchall()]
    cur.close()
    conn.close()
    return jsonify(result)


# ------------------------- DELETE SALE -------------------------
@sales_bp.route("/delete-sale", methods=["POST"])
@admin_required
def delete_sale():
    data = request.json or {}
    sale_id = data.get("sale_id")

    if not sale_id:
        return jsonify({"error": "sale_id is required"}), 400

    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.callproc("DELETE_SALE", [sale_id])   
        conn.commit()
        return jsonify({"message": "Sale deleted successfully"}), 200

    except oracledb.DatabaseError as e:
        error_obj, = e.args
        return jsonify({"error": str(error_obj)}), 400

    finally:
        cursor.close()
        conn.close()


# ------------------------- TOP 10 SALES OF THE MONTH -------------------------
@sales_bp.route("/top-sales-month", methods=["GET"])
#@admin_required
def top_sales_month():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT m.name AS medicine_name,
               SUM(sd.quantity) AS total_sold
        FROM sales s
        JOIN sales_details sd ON s.sale_id = sd.sale_id
        JOIN inventory i ON sd.inventory_id = i.inventory_id
        JOIN medicine m ON i.medicine_id = m.medicine_id
        WHERE TRUNC(s.sale_date, 'MM') = TRUNC(SYSDATE, 'MM')  -- current month
        GROUP BY m.name
        ORDER BY total_sold DESC
        FETCH FIRST 10 ROWS ONLY
    """)
    result = [dict(zip([col[0] for col in cur.description], row)) for row in cur.fetchall()]
    cur.close()
    conn.close()
    return jsonify(result)

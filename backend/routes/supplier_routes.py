from flask import Blueprint, request, jsonify
from db import get_connection
import oracledb

supplier_bp = Blueprint('supplier_bp', __name__)

# ------------------------- ADD SUPPLIER -------------------------

@supplier_bp.route('/add-supplier', methods=['POST'])
def add_supplier():
    data = request.json or {}

    # Validate required fields
    required_fields = ['name', 'contact', 'address', 'email']
    for field in required_fields:
        if not data.get(field):
            return jsonify({"error": f"{field} is required"}), 400

    name = data.get('name')
    contact = data.get('contact')
    address = data.get('address')
    email = data.get('email')

    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.callproc('ADD_SUPPLIER', [name, contact, address, email])
        conn.commit()
        return jsonify({"message": "Supplier added successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        cursor.close()
        conn.close()

# ------------------------- DELETE SUPPLIER -------------------------

@supplier_bp.route('/delete-supplier', methods=['POST'])
def delete_supplier():
    data = request.json or {}
    supplier_id = data.get('supplier_id')

    if not supplier_id:
        return jsonify({"error": "supplier_id is required"}), 400

    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.callproc('DELETE_SUPPLIER', [supplier_id])
        conn.commit()
        return jsonify({"message": "Supplier deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        cursor.close()
        conn.close()

# ------------------------- UPDATE SUPPLIER -------------------------

@supplier_bp.route('/update-supplier', methods=['POST'])
def update_supplier():
    data = request.json or {}
    supplier_id = data.get('supplier_id')

    if not supplier_id:
        return jsonify({"error": "supplier_id is required"}), 400

    name = data.get('name')
    contact = data.get('contact')
    address = data.get('address')
    email = data.get('email')

    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.callproc('UPDATE_SUPPLIER', [supplier_id, name, contact, address, email])
        conn.commit()
        return jsonify({"message": "Supplier updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        cursor.close()
        conn.close()

# ------------------------- VIEW ACTIVE SUPPLIERS -------------------------



@supplier_bp.route('/view-suppliers-status', methods=['GET'])
def view_suppliers():
    try:
        conn = get_connection()
        cursor = conn.cursor()

        
        ref_cursor = cursor.var(oracledb.CURSOR)

        
        cursor.callproc('VIEW_ACTIVE_SUPPLIERS_WITH_STATS', [ref_cursor])

        
        rows = ref_cursor.getvalue().fetchall()

        
        suppliers = []
        for row in rows:
            suppliers.append({
                "supplier_id": row[0],
                "name": row[1],
                "contact": row[2],
                "address": row[3],
                "email": row[4],
                "total_orders": row[5],
                "total_amount": float(row[6])
            })

        return jsonify(suppliers), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400

    finally:
        cursor.close()
        conn.close()
















# @supplier_bp.route('/view-suppliers', methods=['GET'])
# def view_suppliers():
#     try:
#         conn = get_connection()
#         cursor = conn.cursor()
#         ref_cursor = cursor.var(oracledb.CURSOR)
#         cursor.callproc('VIEW_ACTIVE_SUPPLIERS', [ref_cursor])
#         rows = ref_cursor.getvalue().fetchall()

#         suppliers = []
#         for row in rows:
#             suppliers.append({
#                 "supplier_id": row[0],
#                 "name": row[1],
#                 "contact": row[2],
#                 "address": row[3],
#                 "email": row[4]
#             })

#         return jsonify(suppliers), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 400
#     finally:
#         cursor.close()
#         conn.close()

from flask import Blueprint, request, jsonify
from routes.auth_routes import admin_required
from db import get_connection
import oracledb


inventory_bp = Blueprint('inventory_bp', __name__)


# ------------------------- ADD INVENTORY -------------------------

@inventory_bp.route('/add-inventory', methods=['POST'])
@admin_required
def add_inventory():
    data = request.json or {}

    required_fields = ['medicine_id', 'batch_no', 'expiry_date', 'quantity']
    for field in required_fields:
        if not data.get(field):
            return jsonify({"error": f"{field} is required"}), 400

    medicine_id = data.get('medicine_id')
    batch_no = data.get('batch_no')
    expiry_date = data.get('expiry_date')   # format: YYYY-MM-DD
    quantity = data.get('quantity')

    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.callproc('ADD_INVENTORY', [medicine_id, batch_no, expiry_date, quantity])
        conn.commit()
        return jsonify({"message": "Inventory added successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        cursor.close()
        conn.close()


# ------------------------- UPDATE INVENTORY -------------------------

@inventory_bp.route('/update-inventory', methods=['POST'])
@admin_required
def update_inventory():
    data = request.json or {}
    inventory_id = data.get('inventory_id')

    if not inventory_id:
        return jsonify({"error": "inventory_id is required"}), 400

    quantity = data.get('quantity')
    expiry_date = data.get('expiry_date')

    if quantity is None or expiry_date is None:
        return jsonify({"error": "quantity and expiry_date are required"}), 400

    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.callproc('UPDATE_INVENTORY', [inventory_id, quantity, expiry_date])
        conn.commit()
        return jsonify({"message": "Inventory updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        cursor.close()
        conn.close()


# ------------------------- DELETE INVENTORY -------------------------

@inventory_bp.route('/delete-inventory', methods=['POST'])
@admin_required
def delete_inventory():
    data = request.json or {}
    inventory_id = data.get('inventory_id')

    if not inventory_id:
        return jsonify({"error": "inventory_id is required"}), 400

    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.callproc('DELETE_INVENTORY', [inventory_id])
        conn.commit()
        return jsonify({"message": "Inventory deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        cursor.close()
        conn.close()





# ------------------------- VIEW ALL INVENTORIES -------------------------


@inventory_bp.route("/all-inventories", methods=["GET"])
@admin_required
def all_inventories():
    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT i.inventory_id,
                   m.name AS medicine_name,
                   m.generic_name,
                   m.category,
                   m.dosage_form,
                   i.batch_no,
                   i.expiry_date,
                   i.quantity,
                   i.active,
                   i.last_updated
            FROM inventory i
            JOIN medicine m ON i.medicine_id = m.medicine_id
            ORDER BY m.name
        """)

        result = [
            dict(zip([col[0] for col in cursor.description], row))
            for row in cursor.fetchall()
        ]

        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        conn.close()

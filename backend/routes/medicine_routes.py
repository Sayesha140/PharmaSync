from flask import Blueprint, request, jsonify
from db import get_connection
import oracledb;

medicine_bp = Blueprint('medicine_bp', __name__)

# ------------------------- ADD MEDICINE -------------------------

@medicine_bp.route('/add-medicine', methods=['POST'])
def add_medicine():
    data = request.json or {}

    required_fields = ['name', 'generic_name', 'category', 'dosage_form']
    
    for field in required_fields:
        if not data.get(field):
            return jsonify({"error": f"{field} is required"}), 400

    name = data.get('name')
    generic_name = data.get('generic_name')
    category = data.get('category')
    dosage_form = data.get('dosage_form')
    description = data.get('description') or None  

    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.callproc('ADD_MEDICINE', [name, generic_name, category, dosage_form, description])
        conn.commit()
        return jsonify({"message": "Medicine added successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        cursor.close()
        conn.close()


# ------------------------- DELETE MEDICINE -------------------------

@medicine_bp.route('/delete-medicine', methods=['POST'])
def delete_medicine():
    data = request.json or {}
    medicine_id = data.get('medicine_id')

    if not medicine_id:
        return jsonify({"error": "medicine_id is required"}), 400

    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.callproc('DELETE_MEDICINE', [medicine_id])
        conn.commit()
        return jsonify({"message": "Medicine deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        cursor.close()
        conn.close()

# ------------------------- UPDATE MEDICINE -------------------------

@medicine_bp.route('/update-medicine', methods=['POST'])
def update_medicine():
    data = request.json or {}
    medicine_id = data.get('medicine_id')

    if not medicine_id:
        return jsonify({"error": "medicine_id is required"}), 400

    name = data.get('name')
    generic_name = data.get('generic_name')
    category = data.get('category')
    dosage_form = data.get('dosage_form')
    description = data.get('description') or None  

    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.callproc('UPDATE_MEDICINE', [medicine_id, name, generic_name, category, dosage_form, description])
        conn.commit()
        return jsonify({"message": "Medicine updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        cursor.close()
        conn.close()




# ------------------------- VIEW ACTIVE MEDICINES -------------------------

@medicine_bp.route('/view-medicines', methods=['GET'])
def view_medicines():
    try:
        conn = get_connection()
        cursor = conn.cursor()

        
        ref_cursor = cursor.var(oracledb.CURSOR)

        
        cursor.callproc('VIEW_ACTIVE_MEDICINES', [ref_cursor])

        
        rows = ref_cursor.getvalue().fetchall()

        
        medicines = []
        for row in rows:
            medicines.append({
                "medicine_id": row[0],
                "name": row[1],
                "generic_name": row[2],
                "category": row[3],
                "dosage_form": row[4],
                "description": row[5],
                "stock": row[6]
            })

        return jsonify(medicines), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400

    finally:
        cursor.close()
        conn.close()
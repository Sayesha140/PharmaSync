from flask import Blueprint, request, jsonify
import oracledb
from db import get_connection

# Create a Blueprint
medicine_bp = Blueprint('medicine_bp', __name__)

# # Function to get DB connection
# def get_connection():
#     return oracledb.connect(
#         user=config.DB_USER,
#         password=config.DB_PASSWORD,
#         dsn=config.DB_DSN
#     )


# ADD MEDICINE

@medicine_bp.route('/add-medicine', methods=['POST'])
def add_medicine():
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.callproc("ADD_MEDICINE", [
            data.get("name"),
            data.get("generic_name"),
            data.get("category"),
            data.get("dosage_form"),
            data.get("unit_price"),
            data.get("description")
        ])
        conn.commit()
        return jsonify({"message": f"Medicine '{data.get('name')}' added successfully"}), 200
    except oracledb.DatabaseError as e:
        error, = e.args
        return jsonify({"error": str(error.message)}), 400
    finally:
        cursor.close()
        conn.close()



# UPDATE MEDICINE

@medicine_bp.route('/update-medicine', methods=['PUT'])
def update_medicine():
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.callproc("UPDATE_MEDICINE", [
            data.get("medicine_id"),
            data.get("name"),
            data.get("generic_name"),
            data.get("category"),
            data.get("dosage_form"),
            data.get("unit_price"),
            data.get("description")
        ])
        conn.commit()
        return jsonify({"message": f"Medicine '{data.get('medicine_id')}' updated successfully"}), 200
    except oracledb.DatabaseError as e:
        error, = e.args
        return jsonify({"error": str(error.message)}), 400
    finally:
        cursor.close()
        conn.close()


# DELETE MEDICINE

@medicine_bp.route('/delete-medicine', methods=['DELETE'])
def delete_medicine():
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.callproc("DELETE_MEDICINE", [
            data.get("medicine_id")
        ])
        conn.commit()
        return jsonify({"message": f"Medicine '{data.get('medicine_id')}' deleted successfully"}), 200
    except oracledb.DatabaseError as e:
        error, = e.args
        return jsonify({"error": str(error.message)}), 400
    finally:
        cursor.close()
        conn.close()

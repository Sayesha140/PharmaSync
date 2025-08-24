from flask import Blueprint, request, jsonify
from db import get_connection

supplier_bp = Blueprint('supplier_bp', __name__)

@supplier_bp.route('/add-supplier', methods=['POST'])
def add_supplier():
    data = request.json
    required_fields = ["name", "contact", "address", "email"]
    for field in required_fields:
        if not data.get(field):
            return jsonify({"error": f"{field} is required"}), 400

    conn = get_connection()
    cursor = conn.cursor()
    cursor.callproc("ADD_SUPPLIER", [
        data['name'], data['contact'], data['address'], data['email']
    ])
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Supplier added successfully"}), 201


@supplier_bp.route('/update-supplier', methods=['PUT'])
def update_supplier():
    data = request.json
    required_fields = ["supplier_id", "name", "contact", "address", "email"]
    for field in required_fields:
        if not data.get(field):
            return jsonify({"error": f"{field} is required"}), 400

    conn = get_connection()
    cursor = conn.cursor()
    cursor.callproc("UPDATE_SUPPLIER", [
        data['supplier_id'], data['name'], data['contact'], data['address'], data['email']
    ])
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Supplier updated successfully"}), 200


@supplier_bp.route('/delete-supplier', methods=['DELETE'])
def delete_supplier():
    data = request.json
    if not data.get('supplier_id'):
        return jsonify({"error": "supplier_id is required"}), 400

    conn = get_connection()
    cursor = conn.cursor()
    cursor.callproc("DELETE_SUPPLIER", [data['supplier_id']])
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Supplier deleted successfully"}), 200

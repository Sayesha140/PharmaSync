from flask import Blueprint, jsonify
from db import get_connection
from datetime import date

stats_bp= Blueprint("stats", __name__)

# 1. All medicines in inventory including registered with total stock

@stats_bp.route("/inventory-stat", methods=["GET"])
def all_medicines_stock():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT m.medicine_id, m.name, m.generic_name, m.category, m.dosage_form,
               NVL(SUM(i.quantity), 0) AS total_stock_available
        FROM medicine m
        LEFT JOIN inventory i ON m.medicine_id = i.medicine_id AND i.active = 1
        WHERE m.active = 1
        GROUP BY m.medicine_id, m.name, m.generic_name, m.category, m.dosage_form
        ORDER BY m.name
    """)
    result = [dict(zip([col[0] for col in cur.description], row)) for row in cur.fetchall()]
    cur.close()
    conn.close()
    return jsonify(result)



# 2. Out-of-stock (0) medicines

@stats_bp.route("/out-of-stock-stat", methods=["GET"])
def out_of_stock():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT m.medicine_id, m.name, m.generic_name, m.category, m.dosage_form,
               NVL(i.total_qty, 0) AS total_stock
        FROM medicine m
        LEFT JOIN (
            SELECT medicine_id, SUM(quantity) AS total_qty
            FROM inventory
            WHERE active = 1
            GROUP BY medicine_id
        ) i ON m.medicine_id = i.medicine_id
        WHERE m.active = 1 AND NVL(i.total_qty, 0) = 0
        ORDER BY m.name
    """)
    result = [dict(zip([col[0] for col in cur.description], row)) for row in cur.fetchall()]
    cur.close()
    conn.close()
    return jsonify(result)




# 3. Already expired medicines

@stats_bp.route("/expired-medicine-stat", methods=["GET"])
def expired_medicines():
    today = date.today()
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT m.medicine_id, m.name, m.generic_name, m.category, m.dosage_form,
               i.batch_no, i.expiry_date, i.quantity
        FROM inventory i
        JOIN medicine m ON i.medicine_id = m.medicine_id
        WHERE i.active = 1 AND i.expiry_date < :today
        ORDER BY i.expiry_date
    """, [today])
    result = [dict(zip([col[0] for col in cur.description], row)) for row in cur.fetchall()]
    cur.close()
    conn.close()
    return jsonify(result)

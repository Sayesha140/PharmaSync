from flask import Blueprint, jsonify
from db import get_connection
from datetime import datetime, timedelta
from routes.auth_routes import admin_required


alerts_bp = Blueprint("alerts", __name__)


# has stock less than 10 (both in inventory and registered medicines)

@alerts_bp.route("/low-stock-alert", methods=["GET"])
@admin_required
def low_stock_alert():
    threshold = 10  
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT m.MEDICINE_ID, m.NAME, m.GENERIC_NAME, m.CATEGORY, m.DOSAGE_FORM,
                   NVL(SUM(i.QUANTITY), 0) AS TOTAL_QUANTITY
            FROM MEDICINE m
            LEFT JOIN INVENTORY i ON m.MEDICINE_ID = i.MEDICINE_ID
            WHERE m.ACTIVE = 1 AND i.ACTIVE = 1
            GROUP BY m.MEDICINE_ID, m.NAME, m.GENERIC_NAME, m.CATEGORY, m.DOSAGE_FORM
            HAVING NVL(SUM(i.QUANTITY), 0) <= :threshold
            ORDER BY TOTAL_QUANTITY ASC
        """, [threshold])
        rows = cursor.fetchall()
        result = [
            {
                "medicine_id": r[0],
                "name": r[1],
                "generic_name": r[2],
                "category": r[3],
                "dosage_form": r[4],
                "total_quantity": int(r[5])
            } for r in rows
        ]
        cursor.close()
        conn.close()
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
#about to expire in 30 days



@alerts_bp.route("/expiry-alert", methods=["GET"])
@admin_required
def expiry_alert():
    alert_days = 30  
    conn = None
    cursor = None
    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT m.MEDICINE_ID, m.NAME, m.GENERIC_NAME, m.CATEGORY, m.DOSAGE_FORM,
                   i.BATCH_NO, i.EXPIRY_DATE, i.QUANTITY
            FROM MEDICINE m
            JOIN INVENTORY i ON m.MEDICINE_ID = i.MEDICINE_ID
            WHERE m.ACTIVE = 1 
              AND i.ACTIVE = 1
              AND i.EXPIRY_DATE BETWEEN SYSDATE AND SYSDATE + :days
            ORDER BY i.EXPIRY_DATE ASC
        """, [alert_days])

        rows = cursor.fetchall()
        result = [
            {
                "medicine_id": r[0],
                "name": r[1],
                "generic_name": r[2],
                "category": r[3],
                "dosage_form": r[4],
                "batch_no": r[5],
                "expiry_date": r[6].strftime("%Y-%m-%d"),
                "quantity": int(r[7])
            } for r in rows
        ]
        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

from flask import Blueprint, jsonify
from routes.auth_routes import admin_required
from db import get_connection


stats_bp= Blueprint("stats", __name__)

# 1. All medicines in inventory including registered with total stock

@stats_bp.route("/inventory-stat", methods=["GET"])
@admin_required
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
@admin_required
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
@admin_required
def expired_medicines():
    conn = None
    cursor = None
    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT m.medicine_id, m.name, m.generic_name, m.category, m.dosage_form,
                   i.batch_no, i.expiry_date, i.quantity
            FROM inventory i
            JOIN medicine m ON i.medicine_id = m.medicine_id
            WHERE i.active = 1 AND i.expiry_date < SYSDATE
            ORDER BY i.expiry_date
        """)

        result = [
            dict(zip([col[0] for col in cursor.description], row))
            for row in cursor.fetchall()
        ]
        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()






# ------------------------- MONTHLY SALES & PURCHASES -------------------------

@stats_bp.route("/monthly-sales-purchases", methods=["GET"])
@admin_required
def monthly_sales_purchases():
    conn = None
    cursor = None
    try:
        conn = get_connection()
        cursor = conn.cursor()

        # Total sales for current month
        cursor.execute("""
            SELECT NVL(SUM(FINAL_AMOUNT), 0)
            FROM SALES
            WHERE SALE_DATE >= TRUNC(SYSDATE, 'MM')
              AND SALE_DATE < ADD_MONTHS(TRUNC(SYSDATE, 'MM'), 1)
        """)
        total_sales = cursor.fetchone()[0]

        # Total purchases for current month
        cursor.execute("""
            SELECT NVL(SUM(TOTAL_AMOUNT), 0)
            FROM PURCHASE
            WHERE PURCHASE_DATE >= TRUNC(SYSDATE, 'MM')
              AND PURCHASE_DATE < ADD_MONTHS(TRUNC(SYSDATE, 'MM'), 1)
        """)
        total_purchases = cursor.fetchone()[0]

        return jsonify({
            "total_sales": float(total_sales),
            "total_purchases": float(total_purchases)
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()




@stats_bp.route("/daily-sales-purchases", methods=["GET"])
@admin_required
def daily_sales_purchases():
    conn = None
    cursor = None
    try:
        conn = get_connection()
        cursor = conn.cursor()

        # Total sales amount today
        cursor.execute("""
            SELECT NVL(SUM(FINAL_AMOUNT), 0)
            FROM SALES
            WHERE TRUNC(SALE_DATE) = TRUNC(SYSDATE)
        """)
        total_sales_amount = cursor.fetchone()[0]

        # Total items sold today
        cursor.execute("""
            SELECT NVL(SUM(QUANTITY), 0)
            FROM SALES_DETAILS sd
            JOIN SALES s ON sd.SALE_ID = s.SALE_ID
            WHERE TRUNC(s.SALE_DATE) = TRUNC(SYSDATE)
        """)
        total_items_sold = cursor.fetchone()[0]

        # Total purchases today
        cursor.execute("""
            SELECT NVL(COUNT(PURCHASE_ID), 0)
            FROM PURCHASE
            WHERE TRUNC(PURCHASE_DATE) = TRUNC(SYSDATE)
        """)
        total_purchases_count = cursor.fetchone()[0]

        # Total purchase amount today
        cursor.execute("""
            SELECT NVL(SUM(TOTAL_AMOUNT), 0)
            FROM PURCHASE
            WHERE TRUNC(PURCHASE_DATE) = TRUNC(SYSDATE)
        """)
        total_purchase_amount = cursor.fetchone()[0]

        return jsonify({
            "total_sales_amount": float(total_sales_amount),
            "total_items_sold": int(total_items_sold),
            "total_purchases_count": int(total_purchases_count),
            "total_purchase_amount": float(total_purchase_amount)
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

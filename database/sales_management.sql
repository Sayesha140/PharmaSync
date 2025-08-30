----------------------------------------------------- Add Sale------------------------------------------------------------


-- Add a sale with discount and inventory adjustment 
CREATE OR REPLACE PROCEDURE ADD_SALE (
    p_medicines       IN SYS.ODCINUMBERLIST,  -- Array of medicine IDs
    p_quantities      IN SYS.ODCINUMBERLIST,  -- Array of quantities sold
    p_discount_percent IN NUMBER               -- Discount percent
)
IS
    v_sale_id        NUMBER;
    v_total_amount   NUMBER := 0;
    v_final_amount   NUMBER;
    v_unit_price     NUMBER;
    v_subtotal       NUMBER;
    v_qty_to_deduct  NUMBER;
    CURSOR c_batches (p_medicine_id NUMBER) IS
        SELECT INVENTORY_ID, QUANTITY, EXPIRY_DATE
        FROM INVENTORY
        WHERE MEDICINE_ID = p_medicine_id AND ACTIVE = 1 AND QUANTITY > 0
        ORDER BY EXPIRY_DATE; -- FEFO
BEGIN
    -- Insert sale record (auto-generated SALE_ID)
    INSERT INTO SALES (TOTAL_AMOUNT, DISCOUNT_PERCENT, FINAL_AMOUNT)
    VALUES (0, p_discount_percent, 0)
    RETURNING SALE_ID INTO v_sale_id;

    -- Loop through all medicines
    FOR i IN 1 .. p_medicines.COUNT LOOP
        v_qty_to_deduct := p_quantities(i);

        -- Get unit price from MEDICINE table
        SELECT SELL_PRICE INTO v_unit_price
        FROM MEDICINE
        WHERE MEDICINE_ID = p_medicines(i);

        -- Deduct from inventory using FEFO
        FOR batch_rec IN c_batches(p_medicines(i)) LOOP
            EXIT WHEN v_qty_to_deduct = 0;

            IF batch_rec.QUANTITY >= v_qty_to_deduct THEN
                -- Update inventory
                UPDATE INVENTORY
                SET QUANTITY = QUANTITY - v_qty_to_deduct,
                    LAST_UPDATED = SYSDATE
                WHERE INVENTORY_ID = batch_rec.INVENTORY_ID;

                v_subtotal := v_unit_price * v_qty_to_deduct;
                v_total_amount := v_total_amount + v_subtotal;

                -- Insert into sales_details
                INSERT INTO SALES_DETAILS (SALE_ID, MEDICINE_ID, QUANTITY, UNIT_PRICE, SUBTOTAL)
                VALUES (v_sale_id, p_medicines(i), v_qty_to_deduct, v_unit_price, v_subtotal);

                v_qty_to_deduct := 0;
            ELSE
                v_subtotal := v_unit_price * batch_rec.QUANTITY;
                v_total_amount := v_total_amount + v_subtotal;

                INSERT INTO SALES_DETAILS (SALE_ID, MEDICINE_ID, QUANTITY, UNIT_PRICE, SUBTOTAL)
                VALUES (v_sale_id, p_medicines(i), batch_rec.QUANTITY, v_unit_price, v_subtotal);

                v_qty_to_deduct := v_qty_to_deduct - batch_rec.QUANTITY;

                UPDATE INVENTORY
                SET QUANTITY = 0,
                    LAST_UPDATED = SYSDATE
                WHERE INVENTORY_ID = batch_rec.INVENTORY_ID;
            END IF;
        END LOOP;

        IF v_qty_to_deduct > 0 THEN
            RAISE_APPLICATION_ERROR(-20001, 'Not enough stock for medicine ID ' || p_medicines(i));
        END IF;
    END LOOP;

    -- Apply discount
    v_final_amount := v_total_amount * (1 - p_discount_percent/100);

    -- Update sale record
    UPDATE SALES
    SET TOTAL_AMOUNT = v_total_amount,
        FINAL_AMOUNT = v_final_amount
    WHERE SALE_ID = v_sale_id;

    COMMIT;
END;
/


----------------------------------------------------- Delete Sale------------------------------------------------------------



CREATE OR REPLACE PROCEDURE DELETE_SALE_HISTORY (
    p_sale_id IN NUMBER
)
IS
BEGIN
    -- Delete sale details first
    DELETE FROM SALES_DETAILS
    WHERE SALE_ID = p_sale_id;

    -- Delete sale record
    DELETE FROM SALES
    WHERE SALE_ID = p_sale_id;

    COMMIT;
END;
/


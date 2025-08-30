-------------------------------------------------Add a Purchase---------------------------------------------------------------


CREATE OR REPLACE PROCEDURE ADD_PURCHASE (
    p_supplier_id   IN SUPPLIER.SUPPLIER_ID%TYPE,
    p_purchase_date IN DATE DEFAULT NULL,
    p_medicine_ids  IN SYS.ODCINUMBERLIST,
    p_box_quantities IN SYS.ODCINUMBERLIST,      -- number of boxes
    p_units_per_box  IN SYS.ODCINUMBERLIST,      -- tablets per box
    p_batch_nos      IN SYS.ODCIVARCHAR2LIST,
    p_expiry_dates   IN SYS.ODCIDATELIST,
    p_cost_per_box   IN SYS.ODCINUMBERLIST       -- cost per box
) 
IS
    v_purchase_id   PURCHASE.PURCHASE_ID%TYPE;
    v_total_amount  NUMBER := 0;
    v_count         NUMBER;
BEGIN
    -- Check supplier
    SELECT COUNT(*) INTO v_count
    FROM SUPPLIER
    WHERE SUPPLIER_ID = p_supplier_id AND ACTIVE = 1;

    IF v_count = 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Supplier not found or inactive.');
    END IF;

    -- Check array sizes
    IF p_medicine_ids.COUNT != p_box_quantities.COUNT
       OR p_medicine_ids.COUNT != p_units_per_box.COUNT
       OR p_medicine_ids.COUNT != p_batch_nos.COUNT
       OR p_medicine_ids.COUNT != p_expiry_dates.COUNT
       OR p_medicine_ids.COUNT != p_cost_per_box.COUNT THEN
        RAISE_APPLICATION_ERROR(-20002, 'Array size mismatch in inputs.');
    END IF;

    -- Insert PURCHASE
    INSERT INTO PURCHASE (SUPPLIER_ID, PURCHASE_DATE, TOTAL_AMOUNT)
    VALUES (p_supplier_id, NVL(p_purchase_date, SYSDATE), 0)
    RETURNING PURCHASE_ID INTO v_purchase_id;

    -- Insert PURCHASE_DETAILS
    FOR i IN 1 .. p_medicine_ids.COUNT LOOP
        INSERT INTO PURCHASE_DETAILS (
            PURCHASE_ID, MEDICINE_ID, BOX_QUANTITY, UNITS_PER_BOX, COST_PER_BOX, BATCH_NO, EXPIRY_DATE
        )
        VALUES (
            v_purchase_id,
            p_medicine_ids(i),
            p_box_quantities(i),
            p_units_per_box(i),
            p_cost_per_box(i),
            p_batch_nos(i),
            p_expiry_dates(i)
        );

        -- Total purchase amount = sum of (boxes * cost per box)
        v_total_amount := v_total_amount + (p_box_quantities(i) * p_cost_per_box(i));
    END LOOP;

    -- Update total
    UPDATE PURCHASE
    SET TOTAL_AMOUNT = v_total_amount
    WHERE PURCHASE_ID = v_purchase_id;

    COMMIT;

EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
END;
/







----------------------------------------------------Delete a Purchase--------------------------------------------------------




CREATE OR REPLACE PROCEDURE DELETE_PURCHASE(
    p_purchase_id IN PURCHASE.PURCHASE_ID%TYPE
) IS
    v_count NUMBER;
BEGIN
    -- Check if purchase exists
    SELECT COUNT(*) INTO v_count
    FROM PURCHASE
    WHERE PURCHASE_ID = p_purchase_id;

    IF v_count = 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Purchase not found.');
    END IF;

    -- Delete purchase details 
    DELETE FROM PURCHASE_DETAILS
    WHERE PURCHASE_ID = p_purchase_id;

    -- Delete purchase
    DELETE FROM PURCHASE
    WHERE PURCHASE_ID = p_purchase_id;

    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
END;
/







-----------------------------------------------------Trigger After Purchse----------------------------------------------------




CREATE OR REPLACE TRIGGER TRG_AFTER_PURCHASE_DETAIL
AFTER INSERT ON PURCHASE_DETAILS
FOR EACH ROW
DECLARE
    v_count NUMBER;
    v_total_units NUMBER;
BEGIN
    -- Total units = boxes * units per box
    v_total_units := :NEW.BOX_QUANTITY * :NEW.UNITS_PER_BOX;

    -- Check if batch exists
    SELECT COUNT(*) INTO v_count
    FROM INVENTORY
    WHERE MEDICINE_ID = :NEW.MEDICINE_ID
      AND BATCH_NO = :NEW.BATCH_NO;

    IF v_count > 0 THEN
        -- Update existing batch
        UPDATE INVENTORY
        SET QUANTITY = QUANTITY + v_total_units,
            LAST_UPDATED = SYSDATE,
            ACTIVE = 1
        WHERE MEDICINE_ID = :NEW.MEDICINE_ID
          AND BATCH_NO = :NEW.BATCH_NO;
    ELSE
        -- Insert new batch
        INSERT INTO INVENTORY (
            MEDICINE_ID, BATCH_NO, EXPIRY_DATE, QUANTITY, ACTIVE, LAST_UPDATED
        )
        VALUES (
            :NEW.MEDICINE_ID, :NEW.BATCH_NO, :NEW.EXPIRY_DATE,
            v_total_units, 1, SYSDATE
        );
    END IF;

    -- Update total stock in MEDICINE
--    UPDATE MEDICINE
--    SET STOCK = STOCK + v_total_units
--    WHERE MEDICINE_ID = :NEW.MEDICINE_ID;
END;
/




commit;































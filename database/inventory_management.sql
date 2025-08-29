-----------------------------------------------Add Inventory----------------------------------------------------------------


CREATE OR REPLACE PROCEDURE ADD_INVENTORY(
    p_medicine_id IN MEDICINE.MEDICINE_ID%TYPE,
    p_batch_no    IN INVENTORY.BATCH_NO%TYPE,
    p_expiry_date IN INVENTORY.EXPIRY_DATE%TYPE,
    p_quantity    IN INVENTORY.QUANTITY%TYPE
) 
IS
    v_count NUMBER;
BEGIN
    
    SELECT COUNT(*) INTO v_count
    FROM MEDICINE
    WHERE MEDICINE_ID = p_medicine_id AND ACTIVE = 1;

    IF v_count = 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Medicine not found or inactive.');
    END IF;

    
    INSERT INTO INVENTORY(MEDICINE_ID, BATCH_NO, EXPIRY_DATE, QUANTITY, ACTIVE, LAST_UPDATED)
    VALUES (p_medicine_id, p_batch_no, p_expiry_date, p_quantity, 1, SYSDATE);

    COMMIT;
END;
/




------------------------------------------------Update Inventory-------------------------------------------------------------



CREATE OR REPLACE PROCEDURE UPDATE_INVENTORY(
    p_inventory_id IN INVENTORY.INVENTORY_ID%TYPE,
    p_quantity     IN INVENTORY.QUANTITY%TYPE,
    p_expiry_date  IN INVENTORY.EXPIRY_DATE%TYPE  -- no default
) IS
BEGIN
    UPDATE INVENTORY
    SET QUANTITY = p_quantity,
        EXPIRY_DATE = p_expiry_date, 
        LAST_UPDATED = SYSDATE
    WHERE INVENTORY_ID = p_inventory_id;

    IF SQL%ROWCOUNT = 0 THEN
        RAISE_APPLICATION_ERROR(-20002, 'Inventory record not found.');
    END IF;

    COMMIT;
END;
/




----------------------------------------------Delete Inventory----------------------------------------------------------------


CREATE OR REPLACE PROCEDURE DELETE_INVENTORY(
    p_inventory_id IN INVENTORY.INVENTORY_ID%TYPE
) IS
BEGIN
    DELETE FROM INVENTORY
    WHERE INVENTORY_ID = p_inventory_id;

    IF SQL%ROWCOUNT = 0 THEN
        RAISE_APPLICATION_ERROR(-20003, 'Inventory record not found.');
    END IF;

    COMMIT;
END;
/





---------------------------------------------Trigger for stock update---------------------------------------------------------

--
--
--CREATE OR REPLACE TRIGGER TRG_INVENTORY_STOCK_UPDATE
--FOR INSERT OR UPDATE OR DELETE ON INVENTORY
--COMPOUND TRIGGER
--
--    
--    TYPE medicine_id_set IS TABLE OF INVENTORY.MEDICINE_ID%TYPE;
--    g_meds medicine_id_set := medicine_id_set();
--
--    BEFORE STATEMENT IS
--    BEGIN
--        g_meds.DELETE; 
--    END BEFORE STATEMENT;
--
--    AFTER EACH ROW IS
--    BEGIN
--        IF INSERTING OR UPDATING THEN
--            g_meds.EXTEND; g_meds(g_meds.LAST) := :NEW.MEDICINE_ID;
--        ELSIF DELETING THEN
--            g_meds.EXTEND; g_meds(g_meds.LAST) := :OLD.MEDICINE_ID;
--        END IF;
--    END AFTER EACH ROW;
--
--    AFTER STATEMENT IS
--    BEGIN
--        FOR i IN g_meds.FIRST .. g_meds.LAST LOOP
--            UPDATE MEDICINE
--            SET STOCK = NVL((SELECT SUM(QUANTITY)
--                             FROM INVENTORY
--                             WHERE MEDICINE_ID = g_meds(i)), 0)
--            WHERE MEDICINE_ID = g_meds(i);
--        END LOOP;
--    END AFTER STATEMENT;
--
--END;
--/
--
--




commit;







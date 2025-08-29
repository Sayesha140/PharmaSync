----------------------------------------------------- Add Supplier------------------------------------------------------------

CREATE OR REPLACE PROCEDURE ADD_SUPPLIER (
    p_name    IN SUPPLIER.NAME%TYPE,
    p_contact IN SUPPLIER.CONTACT%TYPE,
    p_address IN SUPPLIER.ADDRESS%TYPE,
    p_email   IN SUPPLIER.EMAIL%TYPE
)
IS
    v_id     SUPPLIER.SUPPLIER_ID%TYPE;
    v_count  NUMBER;
BEGIN
    -- Check if exact same active supplier exists
    SELECT COUNT(*) INTO v_count
    FROM SUPPLIER
    WHERE NAME = p_name
      AND CONTACT = p_contact
      AND ADDRESS = p_address
      AND EMAIL = p_email
      AND ACTIVE = 1;

    IF v_count > 0 THEN
        RAISE_APPLICATION_ERROR(-20004, 'Supplier already exists.');
    END IF;

    -- Check if supplier exists but inactive
    BEGIN
        SELECT SUPPLIER_ID INTO v_id
        FROM SUPPLIER
        WHERE NAME = p_name
          AND CONTACT = p_contact
          AND ADDRESS = p_address
          AND EMAIL = p_email
          AND ACTIVE = 0
        FETCH FIRST 1 ROW ONLY;

        -- Reactivate supplier
        UPDATE SUPPLIER
        SET ACTIVE = 1
        WHERE SUPPLIER_ID = v_id;

    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            -- Check if email already exists for a different supplier
            SELECT COUNT(*) INTO v_count
            FROM SUPPLIER
            WHERE EMAIL = p_email
              AND ACTIVE = 1;

            IF v_count > 0 THEN
                RAISE_APPLICATION_ERROR(-20005, 'Email already used by another supplier.');
            END IF;

            -- Insert new supplier
            INSERT INTO SUPPLIER (NAME, CONTACT, ADDRESS, EMAIL)
            VALUES (p_name, p_contact, p_address, p_email);
    END;
END;
/



---------------------------------------------------Update Supplier------------------------------------------------------------


CREATE OR REPLACE PROCEDURE UPDATE_SUPPLIER (
    p_supplier_id IN SUPPLIER.SUPPLIER_ID%TYPE,
    p_name        IN SUPPLIER.NAME%TYPE,
    p_contact     IN SUPPLIER.CONTACT%TYPE,
    p_address     IN SUPPLIER.ADDRESS%TYPE,
    p_email       IN SUPPLIER.EMAIL%TYPE
)
IS
    v_count NUMBER;
BEGIN
    -- Check if supplier exists and is active
    SELECT COUNT(*) INTO v_count
    FROM SUPPLIER
    WHERE SUPPLIER_ID = p_supplier_id
      AND ACTIVE = 1;

    IF v_count = 0 THEN
        RAISE_APPLICATION_ERROR(-20006, 'Supplier not found.');
    END IF;

    -- Check if new email is used by another active supplier
    IF p_email IS NOT NULL THEN
        SELECT COUNT(*) INTO v_count
        FROM SUPPLIER
        WHERE EMAIL = p_email
          AND SUPPLIER_ID != p_supplier_id
          AND ACTIVE = 1;

        IF v_count > 0 THEN
            RAISE_APPLICATION_ERROR(-20007, 'Email already used by another supplier.');
        END IF;
    END IF;

    
    UPDATE SUPPLIER
    SET NAME    = NVL(p_name, NAME),
        CONTACT = NVL(p_contact, CONTACT),
        ADDRESS = NVL(p_address, ADDRESS),
        EMAIL   = NVL(p_email, EMAIL)
    WHERE SUPPLIER_ID = p_supplier_id;
END;
/



---------------------------------------------------Delete Supplier-----------------------------------------------------------


CREATE OR REPLACE PROCEDURE DELETE_SUPPLIER (
    p_supplier_id IN SUPPLIER.SUPPLIER_ID%TYPE
)
IS
    v_count NUMBER;
BEGIN
    
    SELECT COUNT(*) INTO v_count
    FROM SUPPLIER
    WHERE SUPPLIER_ID = p_supplier_id
      AND ACTIVE = 1;

    IF v_count = 0 THEN
        RAISE_APPLICATION_ERROR(-20008, 'Supplier not found or already inactive.');
    END IF;

    
    UPDATE SUPPLIER
    SET ACTIVE = 0
    WHERE SUPPLIER_ID = p_supplier_id;
END;
/



------------------------------------------------view suppliers---------------------------------------------------------------


CREATE OR REPLACE PROCEDURE VIEW_ACTIVE_SUPPLIERS (
    p_recordset OUT SYS_REFCURSOR
)
AS
BEGIN
    OPEN p_recordset FOR
        SELECT SUPPLIER_ID,
               NAME,
               CONTACT,
               ADDRESS,
               EMAIL
        FROM SUPPLIER
        WHERE ACTIVE = 1
        ORDER BY NAME;
END;
/



----------------------------------------------all suppliers with extra info--------------------------------------------------



CREATE OR REPLACE PROCEDURE VIEW_ACTIVE_SUPPLIERS_WITH_STATS(
    p_refcursor OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN p_refcursor FOR
    SELECT s.supplier_id,
           s.name,
           s.contact,
           s.address,
           s.email,
           NVL(COUNT(p.purchase_id), 0) AS total_orders,
           NVL(SUM(p.total_amount), 0) AS total_amount
    FROM supplier s
    LEFT JOIN purchase p
           ON s.supplier_id = p.supplier_id
    WHERE s.active = 1
    GROUP BY s.supplier_id, s.name, s.contact, s.address, s.email
    ORDER BY s.name;
END;
/





-----------------------------------------------------test---------------------------------------------------------------------

--set serveroutput on;
--DECLARE
--    rc SYS_REFCURSOR;
--    v_supplier_id supplier.supplier_id%TYPE;
--    v_name        supplier.name%TYPE;
--    v_contact     supplier.contact%TYPE;
--    v_address     supplier.address%TYPE;
--    v_email       supplier.email%TYPE;
--    v_total_orders NUMBER;
--    v_total_amount NUMBER;
--BEGIN
--    VIEW_ACTIVE_SUPPLIERS_WITH_STATS(rc);
--
--    LOOP
--        FETCH rc INTO v_supplier_id, v_name, v_contact, v_address, v_email, v_total_orders, v_total_amount;
--        EXIT WHEN rc%NOTFOUND;
--        DBMS_OUTPUT.PUT_LINE(v_name || ' | ' || v_email || ' | Orders: ' || v_total_orders || ' | Total: ' || v_total_amount);
--    END LOOP;
--
--    CLOSE rc;
--END;
--/



commit;
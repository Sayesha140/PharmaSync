-- Add Supplier

CREATE OR REPLACE PROCEDURE ADD_SUPPLIER(
    p_name    IN SUPPLIER.NAME%TYPE,
    p_contact IN SUPPLIER.CONTACT%TYPE,
    p_address IN SUPPLIER.ADDRESS%TYPE,
    p_email   IN SUPPLIER.EMAIL%TYPE
) AS
BEGIN
    INSERT INTO SUPPLIER(NAME, CONTACT, ADDRESS, EMAIL)
    VALUES (p_name, p_contact, p_address, p_email);

    DBMS_OUTPUT.PUT_LINE('Supplier added successfully.');

EXCEPTION
    WHEN DUP_VAL_ON_INDEX THEN
        DBMS_OUTPUT.PUT_LINE('Supplier already exists.');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error adding supplier: ' || SQLERRM);
END;
/


-- Update Supplier

CREATE OR REPLACE PROCEDURE UPDATE_SUPPLIER(
    p_supplier_id IN SUPPLIER.SUPPLIER_ID%TYPE,
    p_name        IN SUPPLIER.NAME%TYPE,
    p_contact     IN SUPPLIER.CONTACT%TYPE,
    p_address     IN SUPPLIER.ADDRESS%TYPE,
    p_email       IN SUPPLIER.EMAIL%TYPE
) AS
BEGIN
    UPDATE SUPPLIER
    SET NAME = p_name,
        CONTACT = p_contact,
        ADDRESS = p_address,
        EMAIL = p_email
    WHERE SUPPLIER_ID = p_supplier_id;

    IF SQL%ROWCOUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No supplier found with ID: ' || p_supplier_id);
    ELSE
        DBMS_OUTPUT.PUT_LINE('Supplier updated successfully: ID ' || p_supplier_id);
    END IF;

EXCEPTION
    WHEN DUP_VAL_ON_INDEX THEN
        DBMS_OUTPUT.PUT_LINE('Update failed: duplicate supplier entry.');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error updating supplier: ' || SQLERRM);
END;
/


-- Delete Supplier

CREATE OR REPLACE PROCEDURE DELETE_SUPPLIER(
    p_supplier_id IN SUPPLIER.SUPPLIER_ID%TYPE
) AS
BEGIN
    DELETE FROM SUPPLIER
    WHERE SUPPLIER_ID = p_supplier_id;

    IF SQL%ROWCOUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No supplier found with ID: ' || p_supplier_id);
    ELSE
        DBMS_OUTPUT.PUT_LINE('Supplier deleted successfully: ID ' || p_supplier_id);
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error deleting supplier: ' || SQLERRM);
END;
/

commit;
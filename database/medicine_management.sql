CREATE OR REPLACE PROCEDURE ADD_MEDICINE (
    p_name          IN MEDICINE.NAME%TYPE,
    p_generic_name  IN MEDICINE.GENERIC_NAME%TYPE,
    p_category      IN MEDICINE.CATEGORY%TYPE,
    p_dosage_form   IN MEDICINE.DOSAGE_FORM%TYPE,
    p_unit_price    IN MEDICINE.UNIT_PRICE%TYPE DEFAULT NULL,
    p_description   IN MEDICINE.DESCRIPTION%TYPE DEFAULT NULL
) AS
BEGIN
    
    INSERT INTO MEDICINE (
        NAME,
        GENERIC_NAME,
        CATEGORY,
        DOSAGE_FORM,
        UNIT_PRICE,
        DESCRIPTION,
        UPDATED_AT
    ) VALUES (
        p_name,
        p_generic_name,
        p_category,
        p_dosage_form,
        NVL(p_unit_price, 0),         -- default to 0 if not provided
        NVL(p_description, 'N/A'), -- default if not provided
        SYSDATE
    );

    DBMS_OUTPUT.PUT_LINE('Medicine added successfully.' );

EXCEPTION
    WHEN DUP_VAL_ON_INDEX THEN
        DBMS_OUTPUT.PUT_LINE(' Medicine already exists.');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error adding medicine');
END;
/



CREATE OR REPLACE PROCEDURE DELETE_MEDICINE (
    p_medicine_id IN MEDICINE.MEDICINE_ID%TYPE
) AS
BEGIN
    DELETE FROM MEDICINE
    WHERE MEDICINE_ID = p_medicine_id;

    IF SQL%ROWCOUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No medicine found with ID: ' || p_medicine_id);
    ELSE
        DBMS_OUTPUT.PUT_LINE('Medicine deleted successfully: ID ' || p_medicine_id);
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error deleting medicine: ' || SQLERRM);
END;
/



CREATE OR REPLACE PROCEDURE UPDATE_MEDICINE (
    p_medicine_id   IN MEDICINE.MEDICINE_ID%TYPE,
    p_name          IN MEDICINE.NAME%TYPE DEFAULT NULL,
    p_generic_name  IN MEDICINE.GENERIC_NAME%TYPE DEFAULT NULL,
    p_category      IN MEDICINE.CATEGORY%TYPE DEFAULT NULL,
    p_dosage_form   IN MEDICINE.DOSAGE_FORM%TYPE DEFAULT NULL,
    p_unit_price    IN MEDICINE.UNIT_PRICE%TYPE DEFAULT NULL,
    p_description   IN MEDICINE.DESCRIPTION%TYPE DEFAULT NULL
) AS
BEGIN
    UPDATE MEDICINE
    SET
        NAME = NVL(p_name, NAME),
        GENERIC_NAME = NVL(p_generic_name, GENERIC_NAME),
        CATEGORY = NVL(p_category, CATEGORY),
        DOSAGE_FORM = NVL(p_dosage_form, DOSAGE_FORM),
        UNIT_PRICE = NVL(p_unit_price, UNIT_PRICE),
        DESCRIPTION = NVL(p_description, DESCRIPTION)
    WHERE MEDICINE_ID = p_medicine_id;

    IF SQL%ROWCOUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No medicine found with ID: ' || p_medicine_id);
    ELSE
        DBMS_OUTPUT.PUT_LINE('Medicine updated successfully: ID ' || p_medicine_id);
    END IF;

EXCEPTION
    WHEN DUP_VAL_ON_INDEX THEN
        DBMS_OUTPUT.PUT_LINE('Update failed: duplicate medicine entry.');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error updating medicine: ' || SQLERRM);
END;
/



CREATE OR REPLACE TRIGGER trg_update_medicine
BEFORE UPDATE ON MEDICINE
FOR EACH ROW
BEGIN
    :NEW.UPDATED_AT := SYSDATE;
END;
/


commit;


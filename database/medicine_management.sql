---------------------------------------------------ADD MEDICINE-------------------------------------------------------------



CREATE OR REPLACE PROCEDURE ADD_MEDICINE (
    p_name         IN MEDICINE.NAME%TYPE,
    p_generic_name IN MEDICINE.GENERIC_NAME%TYPE,
    p_category     IN MEDICINE.CATEGORY%TYPE,
    p_dosage_form  IN MEDICINE.DOSAGE_FORM%TYPE,
    p_description  IN MEDICINE.DESCRIPTION%TYPE
) 
IS
    v_id MEDICINE.MEDICINE_ID%TYPE;
    v_count NUMBER;
    
BEGIN

    -- Check if medicine already exists and active
    SELECT COUNT(*) INTO v_count
    FROM MEDICINE
    WHERE NAME = p_name
      AND GENERIC_NAME = p_generic_name
      AND CATEGORY = p_category
      AND DOSAGE_FORM = p_dosage_form
      AND ACTIVE = 1;


    IF v_count > 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Medicine already exists.');
    END IF;
    
    

    -- Check if medicine exists but inactive
    
    BEGIN
        SELECT MEDICINE_ID INTO v_id
        FROM MEDICINE
        WHERE NAME = p_name
          AND GENERIC_NAME = p_generic_name
          AND CATEGORY = p_category
          AND DOSAGE_FORM = p_dosage_form
          AND ACTIVE = 0
        FETCH FIRST 1 ROW ONLY;


        -- Reactivate medicine and its inventory
        
        UPDATE MEDICINE
        SET ACTIVE = 1,
        DESCRIPTION = NVL(p_description, 'N/A')
        WHERE MEDICINE_ID = v_id;

        UPDATE INVENTORY
        SET ACTIVE = 1
        WHERE MEDICINE_ID = v_id;

    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            -- Insert new medicine
            INSERT INTO MEDICINE (NAME, GENERIC_NAME, CATEGORY, DOSAGE_FORM, DESCRIPTION)
            VALUES (p_name, p_generic_name, p_category, p_dosage_form, NVL(p_description, 'N/A'));
    END;
END;
/







---------------------------------------------------DELETE MEDICINE-------------------------------------------------------------




CREATE OR REPLACE PROCEDURE DELETE_MEDICINE (
    p_medicine_id IN MEDICINE.MEDICINE_ID%TYPE
) 
IS
    v_count NUMBER;
    
BEGIN
    
    SELECT COUNT(*) INTO v_count
    FROM MEDICINE
    WHERE MEDICINE_ID = p_medicine_id AND ACTIVE = 1;

    IF v_count = 0 THEN
        RAISE_APPLICATION_ERROR(-20002, 'Medicine not found or already inactive.');
    END IF;

    
    UPDATE MEDICINE
    SET ACTIVE = 0
    WHERE MEDICINE_ID = p_medicine_id;

    
    UPDATE INVENTORY
    SET ACTIVE = 0
    WHERE MEDICINE_ID = p_medicine_id;
END;
/




---------------------------------------------------UPDATE MEDICINE-------------------------------------------------------------



CREATE OR REPLACE PROCEDURE UPDATE_MEDICINE (
    p_medicine_id   IN MEDICINE.MEDICINE_ID%TYPE,
    p_name          IN MEDICINE.NAME%TYPE,
    p_generic_name  IN MEDICINE.GENERIC_NAME%TYPE,
    p_category      IN MEDICINE.CATEGORY%TYPE,
    p_dosage_form   IN MEDICINE.DOSAGE_FORM%TYPE,
    p_description   IN MEDICINE.DESCRIPTION%TYPE
) 

IS
    v_count NUMBER;
    
BEGIN
    
    SELECT COUNT(*) INTO v_count
    FROM MEDICINE
    WHERE MEDICINE_ID = p_medicine_id AND ACTIVE = 1;

    IF v_count = 0 THEN
        RAISE_APPLICATION_ERROR(-20003, 'Medicine not found or inactive.');
    END IF;

    
    UPDATE MEDICINE
    SET NAME         = NVL(p_name, NAME),
        GENERIC_NAME = NVL(p_generic_name, GENERIC_NAME),
        CATEGORY     = NVL(p_category, CATEGORY),
        DOSAGE_FORM  = NVL(p_dosage_form, DOSAGE_FORM),
        DESCRIPTION  = NVL(p_description, DESCRIPTION)
    WHERE MEDICINE_ID = p_medicine_id;
END;
/




----------------------------------------------------VIEW MEDICINE--------------------------------------------------------------



CREATE OR REPLACE PROCEDURE VIEW_ACTIVE_MEDICINES (
    p_result OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN p_result FOR
        SELECT MEDICINE_ID,
               NAME,
               GENERIC_NAME,
               CATEGORY,
               DOSAGE_FORM,
               DESCRIPTION,
               STOCK
        FROM MEDICINE
        WHERE ACTIVE = 1
        ORDER BY NAME;
END;
/






commit;




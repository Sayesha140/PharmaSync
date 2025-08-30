BEGIN
    ADD_INVENTORY(
        p_medicine_id => 3,
        p_batch_no    => 'BATCH003',
        p_expiry_date => TO_DATE('2026-12-31','YYYY-MM-DD'),
        p_quantity    => 100
    );

    ADD_INVENTORY(
        p_medicine_id => 3,
        p_batch_no    => 'BATCH004',
        p_expiry_date => TO_DATE('2027-06-30','YYYY-MM-DD'),
        p_quantity    => 50
    );

    ADD_INVENTORY(
        p_medicine_id => 4,
        p_batch_no    => 'BATCH009',
        p_expiry_date => TO_DATE('2025-06-30','YYYY-MM-DD'),
        p_quantity    => 200
    );
END;
/

-- Check inventory
SELECT * FROM INVENTORY;

-- Check medicine stock (should reflect total of all batches)
SELECT MEDICINE_ID, NAME, STOCK FROM MEDICINE;


-- ==============================================
-- 3. Test: Update inventory quantity
-- ==============================================
BEGIN
    -- Update first batch of Paracetamol from 100 -> 120
    UPDATE_INVENTORY(
        p_inventory_id => 1,
        p_quantity     => 120,
        p_expiry_date  => TO_DATE('2026-12-31','YYYY-MM-DD')
    );
END;
/

-- Check inventory
SELECT * FROM INVENTORY;

-- Check medicine stock (Paracetamol stock should be 120+50=170)
SELECT MEDICINE_ID, NAME, STOCK FROM MEDICINE;


-- ==============================================
-- 4. Test: Delete an inventory batch
-- ==============================================
BEGIN
    -- Delete BATCH002 of Paracetamol
    DELETE_INVENTORY(p_inventory_id => 2);
END;
/

-- Check inventory
SELECT * FROM INVENTORY;

-- Check medicine stock (Paracetamol stock should now be 120)
SELECT MEDICINE_ID, NAME, STOCK FROM MEDICINE;


-- ==============================================
-- 5. Test: Add another batch to same medicine
-- ==============================================
BEGIN
    ADD_INVENTORY(
        p_medicine_id => 1,
        p_batch_no    => 'BATCH004',
        p_expiry_date => TO_DATE('2028-01-01','YYYY-MM-DD'),
        p_quantity    => 30
    );
END;
/

-- Check inventory
SELECT * FROM INVENTORY;


SELECT MEDICINE_ID, NAME, STOCK FROM MEDICINE;






--------------------------------------------------------Purchase test---------------------------------------------------------------

-- Add a supplier
INSERT INTO SUPPLIER (NAME, CONTACT, ADDRESS, EMAIL) 
VALUES ('Supplier A', '0123456789', '123 Street', 'supplierA@example.com');

-- Add some medicines
INSERT INTO MEDICINE (NAME, GENERIC_NAME, CATEGORY, DOSAGE_FORM, SELL_PRICE)
VALUES ('Paracetamol', 'Acetaminophen', 'Analgesic', 'Tablet', 5);

INSERT INTO MEDICINE (NAME, GENERIC_NAME, CATEGORY, DOSAGE_FORM, SELL_PRICE)
VALUES ('Amoxicillin', 'Amoxicillin', 'Antibiotic', 'Capsule', 10);



SELECT * FROM SUPPLIER;
SELECT * FROM MEDICINE;

------------------------------------------------- Add a purchase ----------------------------------------------------

DECLARE
    medicine_ids   SYS.ODCINUMBERLIST := SYS.ODCINUMBERLIST(4, 4);
    box_quantities SYS.ODCINUMBERLIST := SYS.ODCINUMBERLIST(5, 2);      -- number of boxes purchased
    units_per_box  SYS.ODCINUMBERLIST := SYS.ODCINUMBERLIST(10, 20);    -- tablets per box
    batch_nos      SYS.ODCIVARCHAR2LIST := SYS.ODCIVARCHAR2LIST('BATCH111', 'BATCH222');
    expiry_dates   SYS.ODCIDATELIST := SYS.ODCIDATELIST(
                        TO_DATE('2026-12-31','YYYY-MM-DD'),
                        TO_DATE('2025-06-30','YYYY-MM-DD')
                    );
    cost_per_box   SYS.ODCINUMBERLIST := SYS.ODCINUMBERLIST(30, 50);     -- cost per box
BEGIN
    ADD_PURCHASE(
        p_supplier_id   => 2,
        p_purchase_date => NULL,  -- defaults to SYSDATE
        p_medicine_ids  => medicine_ids,
        p_box_quantities => box_quantities,
        p_units_per_box  => units_per_box,
        p_batch_nos     => batch_nos,
        p_expiry_dates  => expiry_dates,
        p_cost_per_box  => cost_per_box
    );
END;
/

------------------------------------------------- Check results ------------------------------------------------------

SELECT * FROM PURCHASE;
SELECT * FROM PURCHASE_DETAILS;
SELECT * FROM INVENTORY where medicine_id=4;
SELECT * FROM MEDICINE where medicine_id=4;

--delete from inventory;
--delete from purchase_details;
--delete from purchase;
--delete from supplier;
--delete from medicine;



INSERT INTO MEDICINE (NAME, GENERIC_NAME, CATEGORY, DOSAGE_FORM, SELL_PRICE, DESCRIPTION)
VALUES ('Paracetamol', 'Acetaminophen', 'Analgesic', 'Tablet', 2.50, 'Pain reliever');

INSERT INTO MEDICINE (NAME, GENERIC_NAME, CATEGORY, DOSAGE_FORM, SELL_PRICE, DESCRIPTION)
VALUES ('Ibuprofen', 'Ibuprofen', 'Analgesic', 'Tablet', 3.00, 'Anti-inflammatory');

INSERT INTO MEDICINE (NAME, GENERIC_NAME, CATEGORY, DOSAGE_FORM, SELL_PRICE, DESCRIPTION)
VALUES ('Amoxicillin', 'Amoxicillin', 'Antibiotic', 'Capsule', 5.00, 'Broad spectrum antibiotic');

INSERT INTO MEDICINE (NAME, GENERIC_NAME, CATEGORY, DOSAGE_FORM, SELL_PRICE, DESCRIPTION)
VALUES ('Cetirizine', 'Cetirizine', 'Antihistamine', 'Tablet', 1.50, 'Allergy relief');

INSERT INTO MEDICINE (NAME, GENERIC_NAME, CATEGORY, DOSAGE_FORM, SELL_PRICE, DESCRIPTION)
VALUES ('Vitamin C', 'Ascorbic Acid', 'Supplement', 'Tablet', 1.00, 'Immune booster');



-- Paracetamol: 2 batches, one expired, one valid
INSERT INTO INVENTORY (MEDICINE_ID, BATCH_NO, EXPIRY_DATE, QUANTITY, ACTIVE) VALUES
(4, 'P001', TO_DATE('2025-12-31', 'YYYY-MM-DD'), 100, 1);


INSERT INTO INVENTORY (MEDICINE_ID, BATCH_NO, EXPIRY_DATE, QUANTITY, ACTIVE) VALUES
(4, 'P002', TO_DATE('2023-06-30', 'YYYY-MM-DD'), 0, 1);


-- Ibuprofen: 1 batch, out of stock
INSERT INTO INVENTORY (MEDICINE_ID, BATCH_NO, EXPIRY_DATE, QUANTITY, ACTIVE) VALUES
(5, 'I001', TO_DATE('2025-10-31', 'YYYY-MM-DD'), 0, 1);

-- Amoxicillin: 1 valid batch
INSERT INTO INVENTORY (MEDICINE_ID, BATCH_NO, EXPIRY_DATE, QUANTITY, ACTIVE) VALUES
(6, 'A001', TO_DATE('2026-01-31', 'YYYY-MM-DD'), 50, 1);

-- Cetirizine: expired batch
INSERT INTO INVENTORY (MEDICINE_ID, BATCH_NO, EXPIRY_DATE, QUANTITY, ACTIVE) VALUES
(7, 'C001', TO_DATE('2022-12-31', 'YYYY-MM-DD'), 20, 1);






select * from inventory;
select * from medicine;
select * from supplier;
select * from purchase;
select * from purchase_details;

INSERT INTO SUPPLIER (NAME, CONTACT, ADDRESS, EMAIL, ACTIVE) VALUES 
('HealthCorp', '123456789', '123 Main St', 'healthcorp@example.com', 1);

DECLARE
    v_medicine_ids SYS.ODCINUMBERLIST := SYS.ODCINUMBERLIST(4, 5, 6);
    v_box_quantities SYS.ODCINUMBERLIST := SYS.ODCINUMBERLIST(10, 5, 15);
    v_units_per_box SYS.ODCINUMBERLIST := SYS.ODCINUMBERLIST(20, 30, 10);
    v_batch_nos SYS.ODCIVARCHAR2LIST := SYS.ODCIVARCHAR2LIST('BATCH001', 'BATCH002', 'BATCH003');
    v_expiry_dates SYS.ODCIDATELIST := SYS.ODCIDATELIST(
        TO_DATE('2026-12-31','YYYY-MM-DD'),
        TO_DATE('2025-12-31','YYYY-MM-DD'),
        TO_DATE('2025-10-31','YYYY-MM-DD')
    );
    v_cost_per_box SYS.ODCINUMBERLIST := SYS.ODCINUMBERLIST(50, 45, 100);
BEGIN
    -- Add a purchase from supplier 3 on 2025-08-01
    ADD_PURCHASE(
        p_supplier_id => 3,
        p_purchase_date => TO_DATE('2025-08-01','YYYY-MM-DD'),
        p_medicine_ids => v_medicine_ids,
        p_box_quantities => v_box_quantities,
        p_units_per_box => v_units_per_box,
        p_batch_nos => v_batch_nos,
        p_expiry_dates => v_expiry_dates,
        p_cost_per_box => v_cost_per_box
    );
END;
/







commit;









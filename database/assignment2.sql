-- 1) Create Tony Stark account
INSERT INTO account VALUES (
    DEFAULT, 'Tony', 'Stark', 'tony@starknet.com', 'Iam1ronM@n'
);

-- 2) Update Tony Stark to admin
UPDATE account SET account_type = 'Admin'::account_type WHERE account_id = 1;

-- 3) Delete Tony Stark account
DELETE FROM account WHERE account_id = 1;

-- 4) Update GM Hummer
UPDATE inventory SET 
    inv_description = REPLACE(inv_description, 'the small interiors', 'a huge interior') 
WHERE 
    inv_make = 'GM' AND inv_model ='Hummer';

-- 5) Inner join to merge make, model, and classification
SELECT 
    inv_make as make, 
    inv_model as model, 
    classification_name as classification 
FROM inventory as i INNER JOIN classification as c 
    ON c.classification_id = i.classification_id;

-- 6) Update all image/thumbnail records to use the pasth "/images/vehicles" instead of "/images"
UPDATE inventory 
	SET inv_image = REPLACE(inv_image, '/images', '/images/vehicles'), 
		inv_thumbnail = REPLACE(inv_thumbnail, '/images', '/images/vehicles')

-- SELECT * FROM account;
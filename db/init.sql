CREATE TABLE admin (
admin_id serial NOT NULL,
username TEXT NOT NULL UNIQUE,
password TEXT NOT NULL,
first_name TEXT NOT NULL,
last_name TEXT NOT NULL,
email TEXT NOT NULL,
CONSTRAINT admin_pk PRIMARY KEY (admin_id)
) ;

CREATE TABLE admin (
admin_id serial NOT NULL,
username TEXT NOT NULL UNIQUE,
password TEXT NOT NULL,
first_name TEXT NOT NULL,
last_name TEXT NOT NULL,
email TEXT NOT NULL,
CONSTRAINT admin_pk PRIMARY KEY (admin_id)
) ;



CREATE TABLE renters (
renter_id serial NOT NULL,
first_name TEXT NOT NULL,
last_name TEXT NOT NULL,
phone_number integer NOT NULL UNIQUE,
email TEXT NOT NULL UNIQUE,
prop_id integer NOT NULL,
property_manager_renter BOOLEAN,
CONSTRAINT renters_pk PRIMARY KEY (renter_id)
) ;



CREATE TABLE properties (
prop_id serial NOT NULL,
address TEXT NOT NULL ,
num_beds integer NOT NULL,
num_baths integer NOT NULL,
square_footage integer NOT NULL,
acreage DECIMAL NOT NULL,
rent money NOT NULL,
mortgage money NOT NULL,
tax_yearly money NOT NULL,
fridge_included BOOLEAN NOT NULL,
dishwasher_included BOOLEAN NOT NULL,
washer_dryer_included BOOLEAN NOT NULL,
gas_company TEXT,
electric_company TEXT,
has_renter BOOLEAN NOT NULL,
CONSTRAINT properties_pk PRIMARY KEY (prop_id),
img_url text,
img_url2 text,
img_url3 text,
img_url4 text,
img_url5 text,
property_name text
) ;



CREATE TABLE properties_admin (
admin_id INTEGER NOT NULL,
prop_id INTEGER NOT NULL

) ;



ALTER TABLE renters ADD CONSTRAINT renters_fk0 FOREIGN KEY (prop_id) REFERENCES properties(prop_id);


ALTER TABLE properties_admin ADD CONSTRAINT properties_admin_fk0 FOREIGN KEY (prop_id) REFERENCES properties(prop_id);
ALTER TABLE properties_admin ADD CONSTRAINT properties_admin_fk1 FOREIGN KEY (admin_id) REFERENCES admin(admin_id);
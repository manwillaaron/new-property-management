CREATE TABLE admin (
admin_id serial PRIMARY KEY,
username TEXT NOT NULL UNIQUE,
password TEXT NOT NULL,
first_name TEXT NOT NULL,
last_name TEXT NOT NULL,
phone_number text,
email TEXT NOT NULL,
is_renter BOOLEAN not null,
property_manager BOOLEAN
) ;


CREATE TABLE properties (
prop_id serial PRIMARY KEY NOT NULL,
address TEXT NOT NULL ,
num_beds integer ,
num_baths integer ,
square_footage integer ,
acreage DECIMAL ,
rent money ,
mortgage money ,
tax_yearly money ,
fridge_included BOOLEAN ,
dishwasher_included BOOLEAN ,
washer_dryer_included BOOLEAN ,
gas_company TEXT,
electric_company TEXT,
has_renter BOOLEAN ,
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

ALTER TABLE properties_admin ADD CONSTRAINT properties_admin_fk0 FOREIGN KEY (prop_id) REFERENCES properties(prop_id);
ALTER TABLE properties_admin ADD CONSTRAINT properties_admin_fk1 FOREIGN KEY (admin_id) REFERENCES admin(admin_id);





create table chat_junction (
 chatroom_id serial PRIMARY KEY,
 admin_id INTEGER references admin(admin_id),
 admin_id_renter INTEGER references admin(admin_id)
 );


 create table messages (
message_id serial PRIMARY KEY,
chatroom_id INTEGER REFERENCES chat_junction(chatroom_id),
message_content text
);
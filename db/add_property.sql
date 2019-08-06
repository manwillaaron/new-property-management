insert into properties (
address, 
num_beds, 
num_baths, 
square_footage, 
acreage, 
rent, 
gas_company, 
electric_company, 
has_renter,
fridge_included, 
dishwasher_included, 
washer_dryer_included, 
mortgage, 
tax_yearly,
img_url,
img_url2,
img_url3,
img_url4,
img_url5,
property_name)
values
($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20);

insert into properties_admin (prop_id, admin_id)
values ((select max(prop_id) from properties),$21);

 INSERT into admin (
 username, 
 password, 
 first_name, 
 last_name, 
 phone_number, 
 email, 
 is_renter,
 property_manager)
values ($1,$2,$3,$4,$5,$6,'false','true')
returning *;

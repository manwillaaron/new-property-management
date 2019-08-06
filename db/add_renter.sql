INSERT into admin (
 username,
 password,
 first_name, 
 last_name, 
 phone_number, 
 email, 
 is_renter, 
 property_manager)
values ($5,$1,$2,$3,$4,$5,'true','false');

insert into properties_admin ( prop_id, admin_id)
values($6,( select max(admin_id) from admin ));

insert into chat_junction (admin_id_pm, admin_id_rent)
values ((select a.admin_id from admin a
    join properties_admin pa         
    on a.admin_id = pa.admin_id
     where a.is_renter = false
    and pa.prop_id = $6), 
    (select max(admin_id) from admin));



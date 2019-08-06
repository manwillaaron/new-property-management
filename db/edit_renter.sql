update renters 
set first_name = $2,
last_name = $3,
phone_number = $4,
email = $5,
property_manager_renter = $6
where renter_id = $7;

select * from renters r 
join properties p
on p.prop_id = r.prop_id
where p.prop_id = $1;
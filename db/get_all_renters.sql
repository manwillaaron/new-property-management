select a.admin_id, a.first_name, a.last_name, a.phone_number, a.email from admin a
join properties_admin pa
on pa.admin_id = a.admin_id
where pa.prop_id in (select prop_id from properties_admin pa
where pa.admin_id = $1)
and a.is_renter = true;

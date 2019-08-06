
select * from admin a
join properties_admin pa
on pa.admin_id = a.admin_id
where pa.prop_id = $1
and a.is_renter in ('true');


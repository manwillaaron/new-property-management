
delete from properties_admin
where prop_id =$1;

delete from properties 
where prop_id = $1;

select * from properties_admin pa
join  properties p
on p.prop_id = pa.prop_id
join admin a 
on a.admin_id = pa.admin_id
where pa.admin_id = $2;


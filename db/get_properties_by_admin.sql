select * from properties 
join  properties_admin
on properties.prop_id = properties_admin.prop_id
join admin  
on admin.admin_id = properties_admin.admin_id
where admin.admin_id = $1;

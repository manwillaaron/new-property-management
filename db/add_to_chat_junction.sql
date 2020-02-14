insert into chat_junction (admin_id_pm, admin_id_rent)
values ((select a.admin_id from admin a
    join properties_admin pa         
    on a.admin_id = pa.admin_id
     where a.is_renter = false
    and pa.prop_id = $1),
    $2);

  select a.* from admin a
    join properties_admin pa         
    on a.admin_id = pa.admin_id
    where pa.prop_id = $1;
insert into chat_junction (admin_id, admin_id_renter)
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
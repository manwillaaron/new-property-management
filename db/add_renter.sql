WITH a_id as (
    INSERT INTO admin (
    password,
    first_name, 
    last_name, 
    phone_number, 
    email, 
    username,
    is_renter, 
    property_manager
    )
    VALUES (${password},${first_name},${last_name},${phone_number},${email},${email},'true','false')
    RETURNING admin_id
),
a_id2 as (insert into properties_admin ( prop_id, admin_id)
values(${prop_id},(select admin_id from a_id))
returning admin_id
)
insert into chat_junction (admin_id, admin_id_renter)
values (
   (select a.admin_id from admin a
    join properties_admin pa         
    on a.admin_id = pa.admin_id
     where a.is_renter = false
    and pa.prop_id = ${prop_id}), (select admin_id from a_id2));

        select a.* from admin a
        join properties_admin pa         
        on a.admin_id = pa.admin_id
        where pa.prop_id = ${prop_id};



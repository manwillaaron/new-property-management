insert into repairs (prop_id, admin_id, repair_description, occurence_date, status, completed)
values ($1,$2,$3,$4, 'in review', 'false')
returning *;
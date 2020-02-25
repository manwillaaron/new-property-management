insert into expenses  
(store, amount, prop_id, transaction_date, for_property)
values 
(${store},${amount},${prop_id},${transaction_date},${for_property})
returning *;
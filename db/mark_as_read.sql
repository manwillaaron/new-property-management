alter table messages
set read = 'true'
where message_id = $1;
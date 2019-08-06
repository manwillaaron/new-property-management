insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ($1,$2,$3,(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ($2,$4)));




 
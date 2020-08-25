insert into messages (message_content,  admin_id_messages, chatroom_id)
values ($1,$2,$3)
returning  *;




 
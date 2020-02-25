insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ($1,$2,$3,$4)
returning  *
;




 
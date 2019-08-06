select * from messages m
join chat_junction cj
on cj.chatroom_id = m.chatroom_id
where cj.admin_id_pm = $1
or cj.admin_id_rent = $1;
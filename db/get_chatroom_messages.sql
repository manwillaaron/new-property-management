select * from messages m
join chat_junction cj
on cj.chatroom_id = m.chatroom_id
where cj.admin_id = $1
or cj.admin_id_renter = $1
order by message_id desc;
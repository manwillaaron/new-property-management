select * from chat_junction cj
join admin a
on a.chatroom_id = cj.chatroom_id
where cj.admin_id in ($1):
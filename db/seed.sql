 INSERT into admin (
 username, 
 password, 
 first_name, 
 last_name, 
 phone_number, 
 email, 
 is_renter,
 property_manager)
values ('1','1','Spence','Robinson','8014721086','spence@gmail.com','false','true'),
('2','1','Carly','Manwill','8014721086','carly@gmail.com','false','true'),
('3','1','Jeordin','Callister','8014721086','jeordin@gmail.com','false','true'),
('4','1','Aaron','Manwill','3146620077','aaron@gmail.com','false','true'),
('5','1','Matias','dumbass','8014721086','dumbass@gmail.com','false','true');

select * from admin;

 INSERT into admin (
 username, 
 password, 
 first_name, 
 last_name, 
 phone_number, 
 email, 
 is_renter,
 property_manager)
values ('1','1','Spence','Robinson','8014721086','spence@gmail.com','false','true'),
('2','1','Carly','Manwill','8014721086','carly@gmail.com','false','true'),
('3','1','Jeordin','Callister','8014721086','jeordin@gmail.com','false','true'),
('4','1','Aaron','Manwill','3146620077','aaron@gmail.com','false','true'),
('5','1','Matias','dumbass','8014721086','dumbass@gmail.com','false','true');

select * from admin;

 INSERT into admin (
 username, 
 password, 
 first_name, 
 last_name, 
 phone_number, 
 email, 
 is_renter,
 property_manager)
values ('1','1','Spence','Robinson','8014721086','spence@gmail.com','false','true'),
('2','1','Carly','Manwill','8014721086','carly@gmail.com','false','true'),
('3','1','Jeordin','Callister','8014721086','jeordin@gmail.com','false','true'),
('4','1','Aaron','Manwill','3146620077','aaron@gmail.com','false','true'),
('5','1','Matias','dumbass','8014721086','dumbass@gmail.com','false','true');

select * from admin;


insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ('hey','127','34',(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ('127','34')));

insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ('hi','127','34',(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ('132','34')));

insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ('whats up?','127','34',(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ('127','34')));

insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ('nothing','127','34',(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ('132','34')));

insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ('You?','127','34',(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ('132','34')));

insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ('nothing','127','34',(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ('127','34')));

insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ('cool','127','34',(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ('132','34')));


insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ('nothing','127','34',(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ('127','34')));

insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ('hey','127','34',(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ('127','34')));

insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ('hi','127','34',(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ('132','34')));

insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ('whats up?','127','34',(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ('127','34')));

insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ('nothing','127','34',(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ('132','34')));

insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ('You?','127','34',(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ('132','34')));

insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ('nothing','127','34',(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ('127','34')));

insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ('cool','127','34',(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ('132','34')));


insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ('nothing','127','34',(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ('127','34')));

insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ('hey','127','34',(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ('127','34')));

insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ('hi','127','34',(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ('132','34')));

insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ('whats up?','127','34',(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ('127','34')));

insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ('nothing','127','34',(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ('132','34')));

insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ('You?','127','34',(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ('132','34')));

insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ('nothing','127','34',(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ('127','34')));

insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ('cool','127','34',(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ('132','34')));


insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ('nothing','127','34',(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ('127','34')));

insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ('hey','127','34',(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ('127','34')));

insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ('hi','127','34',(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ('132','34')));

insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ('whats up?','127','34',(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ('127','34')));

insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ('nothing','127','34',(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ('132','34')));

insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ('You?','127','34',(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ('132','34')));

insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ('nothing','127','34',(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ('127','34')));

insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ('cool','127','34',(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ('132','34')));


insert into messages (message_content,  admin_id_messages, first_name, chatroom_id)
values ('nothing','127','34',(select distinct(chatroom_id) from chat_junction
where admin_id_rent in ('127','34')));

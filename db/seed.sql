insert into properties (
property_name
address, 
num_beds, 
num_baths, 
square_footage, 
acreage, 
rent, 
gas_company, 
electric_compan,
has_renter, 
fridge_included, 
dishwasher_included, 
washer_dryer_included, 
mortgage, 
taxes,
img_url,
img_url2,
img_url3,
img_url4,
img_url5)
values
('Straub','728 Straub Road, Chesterfield MO, 63017','5','3','3000','3','2000','mogas','moelec','true','true','true','true','1200','1500',
'https://photos.zillowstatic.com/cc_ft_768/ISq9k7ffd9ektk1000000000.webp',
'https://photos.zillowstatic.com/cc_ft_1536/IS27y12mka5q0l1000000000.webp',
'https://photos.zillowstatic.com/cc_ft_384/IS6ipp0w3e811l1000000000.webp',
'https://photos.zillowstatic.com/cc_ft_384/ISugcpyse1vh1l1000000000.webp',
'https://photos.zillowstatic.com/cc_ft_384/ISuwsod6d0t62l1000000000.webp'),
('Alpine','14 S 200 E, Alpine UT, 84004','3','1','1500','.34','1500','UTgas','Rocky Moutain','true','true','true','true','800','1497',
'https://photos.zillowstatic.com/p_h/ISewpddbooo58p1000000000.jpg',
'https://photos.zillowstatic.com/p_c/ISi7pjjhqw625r1000000000.jpg',
'https://photos.zillowstatic.com/p_c/ISu4n5h28cj53p1000000000.jpg',
'https://photos.zillowstatic.com/p_c/ISesihgpzv2b3p1000000000.jpg',
'https://photos.zillowstatic.com/p_c/ISu4n5h28cj53p1000000000.jpg'),
('North','20 North Drive, Balwin MO, 63011','2','1','1000','.4','900','mogas','moelec','true','true','false','false','900','900',
'https://photos.zillowstatic.com/fp/3615a0ca665499c97a33c7f21822b018-cc_ft_768.webp'
,'https://photos.zillowstatic.com/fp/3615a0ca665499c97a33c7f21822b018-cc_ft_768.webp'
,'https://photos.zillowstatic.com/fp/86f9cc0ba501b56d8b761d30e69e03c3-cc_ft_384.webp'
,'https://photos.zillowstatic.com/fp/b6da312d1c04760653fd989f2cc53961-cc_ft_384.webp'
,'https://photos.zillowstatic.com/fp/f5a936d409b1c9058989aea29601af50-cc_ft_384.webp'),
('Rose','12 Rose Lane, Ballwin MO, 63011','2','1','1000','.4','900','mogas','moelec','true','true','false','false','900','900',
'https://photos.zillowstatic.com/fp/4349057d0b564760b58a0b8a33c2423c-cc_ft_768.webp',
'https://photos.zillowstatic.com/fp/803d0295492141ac345efb0917c56350-cc_ft_384.webp',
'https://photos.zillowstatic.com/fp/6db962e38d4c61fa0cd3f9de28a941ee-cc_ft_384.webp',
'https://photos.zillowstatic.com/fp/32c305f0e5588dad620d60d8b98fc633-cc_ft_384.webp',
'https://photos.zillowstatic.com/fp/a0c76b0b47fa24509c948ef2e1b759e9-cc_ft_384.webp'),
('Crest','34 Crest Drive, Sheman MO 63021','2','1','1000','.4','900','mogas','moelec','true','true','false','false','900','900',
'https://photos.zillowstatic.com/p_h/ISif3g0igoqzhw1000000000.jpg',
'https://photos.zillowstatic.com/cc_ft_384/IS2zzlk8qwnrpw1000000000.webp',
'https://photos.zillowstatic.com/cc_ft_384/ISmmvxjvhg7xpw1000000000.webp',
'https://photos.zillowstatic.com/cc_ft_384/ISq55hdjn8k1mv1000000000.webp',
'https://photos.zillowstatic.com/cc_ft_384/ISalixhss3udqw1000000000.webp');

insert into admin (username,password,first_name,last_name,email)
values 
('manwillaaron', '123', aaron, manwill, 123@g.com);


/////renters

INSERT into admin (username, 
 password, 
 first_name, 
 last_name, 
 phone_number, 
 email, 
 is_renter, 
 property_manager)
values ('man','12345','aaron','man','+1314','man@gmail.com','true','false');

insert into properties_admin (admin_id, prop_id)
values((select admin_id from admin
where phone_number = '+1314'),'4');

update admin
set username = 'man@gmail.com'
where phone_number = '+1314';

update admin
set password = '+1314'
where username = 'man@gmail.com';


select * from properties;



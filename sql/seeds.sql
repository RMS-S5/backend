CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
delete from customer;
delete from staff;
delete from user_account;
delete from account_type;

delete from "order";
delete from order_status;
delete from cart_item;
delete from "cart";

delete from food_variant;
delete from food_item ;
delete from category ;

delete from room ;
delete from room_type ;

-- Insert user types
insert into account_type values 
	('Customer'),
	('Waiter'),
	('Kitchen Staff'),
	('Branch Manager'),
	('Manager'),
	('Receptionist');


insert into order_status values
	('Placed'),
	('Preparing'),
	('Prepared'),
	('Waiter Assigned'),
	('Rejected'),
	('Served'),
	('Paid'),
	('Closed');


do $$
declare
	userId1 uuid := uuid_generate_v4();
	userId2 uuid := uuid_generate_v4();
	userId3 uuid := uuid_generate_v4();
	userId4 uuid := uuid_generate_v4();
	userId5 uuid := uuid_generate_v4();
	userId6 uuid := uuid_generate_v4();
		
	category1 uuid  := uuid_generate_v4();
	category2 uuid  := uuid_generate_v4();
	category3 uuid  := uuid_generate_v4();
	category4 uuid  := uuid_generate_v4();
	category5 uuid  := uuid_generate_v4();

	foodItem1 uuid := uuid_generate_v4();
	foodItem2 uuid := uuid_generate_v4();
	foodItem3 uuid := uuid_generate_v4();
	foodItem4 uuid := uuid_generate_v4();
	foodItem5 uuid := uuid_generate_v4();
	foodItem6 uuid := uuid_generate_v4();
	foodItem7 uuid := uuid_generate_v4();
	foodItem8 uuid := uuid_generate_v4();
	foodItem9 uuid := uuid_generate_v4();
	foodItem10 uuid := uuid_generate_v4();

	cart1 uuid := uuid_generate_v4();

	cartItem1 uuid := uuid_generate_v4();

	branchId1 uuid := uuid_generate_v4();
	branchId2 uuid := uuid_generate_v4();

begin
	insert into branch("branch_id", "branch_name") values
		(branchId1, 'Horana'),
		(branchId2, 'Maharagam');
	
	insert into user_account("user_id", "first_name", "last_name", "email","mobile_number" ,"account_type", "password") values
	(userId1, 'John', 'Doe', 'johndoe@gmail.com', 0774531987,'Customer' , '$2b$10$WKtfDvEY5/FVdOb81yKjAO5MLcgeEazC5gdPal70uybfjhxRtOm0m'),
	(userId2, 'Darshana', 'Fernando', 'darshana@gmail.com',0745879632,'Kitchen Staff', '$2b$10$WKtfDvEY5/FVdOb81yKjAO5MLcgeEazC5gdPal70uybfjhxRtOm0m' ),
	(userId3, 'Nuwan', 'Pranandu', 'nuwan@gmail.com',  0775826478,'Waiter' , '$2b$10$WKtfDvEY5/FVdOb81yKjAO5MLcgeEazC5gdPal70uybfjhxRtOm0m'),
	(userId4, 'Nagitha', 'Jayasekara', 'nagitha@gmail.com',  0758641985,'Manager' , '$2b$10$WKtfDvEY5/FVdOb81yKjAO5MLcgeEazC5gdPal70uybfjhxRtOm0m'),
	(userId5, 'Dumindu', 'Silva', 'dumindu@gmail.com',  0724685129,'Branch Manager' , '$2b$10$WKtfDvEY5/FVdOb81yKjAO5MLcgeEazC5gdPal70uybfjhxRtOm0m'),
	(userId6, 'Harsha', 'Perera', 'harsha@gmail.com',  0786421596,'Receptionist' , '$2b$10$WKtfDvEY5/FVdOb81yKjAO5MLcgeEazC5gdPal70uybfjhxRtOm0m');

	insert into customer("user_id") values
		(userId1);
	
	insert into staff("user_id", "branch_id",  "nic") values
		(userId2 , branchId1 ,  '197854628887V'),
		(userId3 , branchId1 ,  '199954628887V'),
		(userId4 , null, '199754628887V'),
		(userId5 , branchId1 ,  '200154628887V'),
		(userId6 , branchId1 , '200154628257V');

	insert into category("category_id", "category_name" , "description") values
		(category1, 'Kottu', 'Delicious Kottu'),
		(category2, 'Fried Rice', 'Delicious Fried Rice'),
		(category3, 'Burger', 'Delicious Burger'),
		(category4, 'Pizza', 'Delicious Pizza'),
		(category5, 'Roti', 'Delicious Roti');
	
	insert into food_item("food_item_id", "name", "category_id", "description", "image_url", "price")
		values
		(foodItem1 , 'Chicken Kottu', category1, 
		'Delicious Chicken Kottu',
		'https://static.wikia.nocookie.net/recipes/images/6/62/800px-Chicken_Kotthu_-_Food_1.jpg/revision/latest?cb=20170428083112',
		350.00 ),
		(foodItem2 , 'Cheese Kottu', category1, 'Delicious Cheese Kottu',
		'https://dynamicrestaurant.lk/wp-content/uploads/elementor/thumbs/CHEESE-KOTTU-p1m049yia94tcbw3t1dlvy39sshiytisbqievg0794.png', 
		500.00 ),
		(foodItem3 , 'Egg Kottu', category1, 'Delicious Egg Kottu',
		'https://shophere.lk/wp-content/uploads/2020/04/ek.jpg', 
		250.00 ),
		(foodItem4 , 'Dolphin Kottu', category1,'Delicious Dolphin Kottu',
		'https://s3-ap-southeast-1.amazonaws.com/pankadu-lk/42/69818447827757984.jpg', 250.00 ),
		(foodItem5 , 'Chicken Pizza', category4, 'Delicious Chicken Pizza',
		'https://static.toiimg.com/thumb/53339084.cms?width=1200&height=900',
		700.00 ),
		(foodItem6 , 'Cheese Pizza', category4, 'Delicious Cheese Pizza',
		'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cheesy-pepperoni-pizza-royalty-free-image-938742222-1558126849.jpg',
		750.00 ),
		(foodItem7 , 'Veggie Pizza', category4, 'Delicious Veggie Pizza',
		'https://www.twopeasandtheirpod.com/wp-content/uploads/2021/03/Veggie-Pizza-8-500x375.jpg',
		600.00 );
	
	call set_food_variants(foodItem1, '[{"variant_name" : "Small", "price" : 350.00}, {"variant_name" : "Medium", "price" : 450.00}]');
	call set_food_variants(foodItem2, '[{"variant_name" : "Small", "price" : 500.00}, {"variant_name" : "Medium", "price" : 650.00}]');
	call set_food_variants(foodItem3, '[{"variant_name" : "Small", "price" : 250.00}, {"variant_name" : "Medium", "price" : 350.00}]');
	call set_food_variants(foodItem4, '[{"variant_name" : "Small", "price" : 250.00}, {"variant_name" : "Medium", "price" : 450.00}]');
	call set_food_variants(foodItem5, '[{"variant_name" : "Small", "price" : 700.00}, {"variant_name" : "Medium", "price" : 1200.00}]');
	call set_food_variants(foodItem6, '[{"variant_name" : "Small", "price" : 750.00}, {"variant_name" : "Medium", "price" : 1100.00}]');
	call set_food_variants(foodItem7, '[{"variant_name" : "Small", "price" : 600.00}, {"variant_name" : "Medium", "price" : 1000.00}]');
	
	insert into "table" ("branch_id", "table_number", verification_code) values
		(branchId1, 1, uuid_generate_v4()),
		(branchId1, 2, uuid_generate_v4()),
		(branchId1, 3, uuid_generate_v4()),
		(branchId1, 4, uuid_generate_v4()),
		(branchId1, 5, uuid_generate_v4()),
		(branchId1, 6, uuid_generate_v4()),
		(branchId1, 7, uuid_generate_v4()),
		(branchId1, 8, uuid_generate_v4());

	insert into "room_type" ("room_type", "description") values
		('Suite', 'Suite Room'),
		('Deluxe', 'Deluxe Room'),
		('Vip', 'Vip Room');

	insert into "room" ("room_number", "branch_id", "capacity", "room_type", "price") values
		('1', branchId1, '2', 'Suite', '22000'),
		('2', branchId1, '3', 'Suite', '32000'),
		('3', branchId1, '1', 'Vip', '20000'),
		('1', branchId2, '2', 'Deluxe', '42000'),
		('2', branchId2, '3', 'Suite', '32000');

	insert into "order" ("order_id", "customer_id", "total_amount", "table_number", "branch_id", "order_status", "placed_time", "waiter_id", "kitchen_staff_id") values
		(order1, userId1, 20000, 1, branchId1, 'Served', '2021-10-01 08:00:00.000', userId3, userId2),
		(order2, userId1, 3000, 1, branchId1, 'Served', '2021-10-11 08:00:00.000', userId3, userId2),
		(order3, userId1, 4000, 1, branchId1, 'Served', '2021-10-16 08:00:00.000', userId3, userId2),
		(order4, userId1, 23000, 1, branchId1, 'Served', '2021-10-21 08:00:00.000', userId3, userId2),
		(order5, userId1, 2200, 1, branchId1, 'Served', '2021-10-26 08:00:00.000', userId3, userId2),
		(order6, userId1, 20100, 1, branchId1, 'Served', '2021-10-27 08:00:00.000', userId3, userId2),
		(order7, userId1, 5000, 1, branchId1, 'Served', '2021-10-11 04:00:00.000', userId3, userId2),
		(order8, userId1, 6000, 1, branchId1, 'Served', '2021-10-11 12:00:00.000', userId3, userId2),
		(order9, userId1, 7000, 1, branchId1, 'Served', '2021-10-11 20:00:00.000', userId3, userId2),
		(order10, userId1, 24000, 1, branchId1, 'Served', '2021-10-11 23:00:00.000', userId3, userId2),
		(order11, userId1, 20000, 1, branchId2, 'Served', '2021-10-01 08:00:00.000', userId3, userId2),
		(order12, userId1, 3000, 1, branchId2, 'Served', '2021-10-11 08:00:00.000', userId3, userId2),
		(order13, userId1, 4000, 1, branchId2, 'Served', '2021-10-16 08:00:00.000', userId3, userId2),
		(order14, userId1, 23000, 1, branchId2, 'Served', '2021-10-21 08:00:00.000', userId3, userId2),
		(order15, userId1, 2200, 1, branchId2, 'Served', '2021-10-26 08:00:00.000', userId3, userId2),
		(order16, userId1, 20100, 1, branchId2, 'Served', '2021-10-27 08:00:00.000', userId3, userId2),
		(order17, userId1, 5000, 1, branchId2, 'Served', '2021-10-11 04:00:00.000', userId3, userId2),
		(order18, userId1, 6000, 1, branchId2, 'Served', '2021-10-11 12:00:00.000', userId3, userId2),
		(order19, userId1, 7000, 1, branchId2, 'Served', '2021-10-03 20:00:00.000', userId3, userId2),
		(order20, userId1, 24000, 1, branchId2, 'Served', '2021-10-03 23:00:00.000', userId3, userId2);

	insert into "booking" ("booking_id", "customer_id", "arrival", "departure", "placed_time", "status") values
		(booking21, userId1, '2021-10-01 08:00:00.000', '2021-10-01 08:00:00.000', '2021-10-01 08:00:00.000', 'Placed'),
		(booking22, userId1, '2021-10-01 08:00:00.000', '2021-10-01 08:00:00.000', '2021-10-01 08:00:00.000', 'Placed'),
		(booking23, userId1, '2021-10-01 08:00:00.000', '2021-10-01 08:00:00.000', '2021-10-01 08:00:00.000', 'Accepted'),
		(booking24, userId1, '2021-10-01 08:00:00.000', '2021-10-01 08:00:00.000', '2021-10-01 08:00:00.000', 'Lodged'),
		(booking1, userId1, '2021-10-01 08:00:00.000', '2021-10-01 08:00:00.000', '2021-10-01 08:00:00.000', 'Completed'),
		(booking2, userId1, '2021-10-01 08:00:00.000', '2021-10-01 08:00:00.000', '2021-10-11 08:00:00.000', 'Completed'),
		(booking3, userId1, '2021-10-01 08:00:00.000', '2021-10-01 08:00:00.000', '2021-10-16 08:00:00.000', 'Completed'),
		(booking4, userId1, '2021-10-01 08:00:00.000', '2021-10-01 08:00:00.000', '2021-10-21 08:00:00.000', 'Completed'),
		(booking5, userId1, '2021-10-01 08:00:00.000', '2021-10-01 08:00:00.000', '2021-10-26 08:00:00.000', 'Completed'),
		(booking6, userId1, '2021-10-01 08:00:00.000', '2021-10-01 08:00:00.000', '2021-10-27 08:00:00.000', 'Completed'),
		(booking7, userId1, '2021-10-01 08:00:00.000', '2021-10-01 08:00:00.000', '2021-10-11 04:00:00.000', 'Completed'),
		(booking8, userId1, '2021-10-01 08:00:00.000', '2021-10-01 08:00:00.000', '2021-10-11 12:00:00.000', 'Completed'),
		(booking9, userId1, '2021-10-01 08:00:00.000', '2021-10-01 08:00:00.000', '2021-10-11 20:00:00.000', 'Completed'),
		(booking10, userId1, '2021-10-01 08:00:00.000', '2021-10-01 08:00:00.000', '2021-10-11 23:00:00.000', 'Completed'),
		(booking11, userId1, '2021-10-01 08:00:00.000', '2021-10-01 08:00:00.000', '2021-10-01 08:00:00.000', 'Completed'),
		(booking12, userId1, '2021-10-01 08:00:00.000', '2021-10-01 08:00:00.000', '2021-10-11 08:00:00.000', 'Completed'),
		(booking13, userId1, '2021-10-01 08:00:00.000', '2021-10-01 08:00:00.000', '2021-10-16 08:00:00.000', 'Completed'),
		(booking14, userId1, '2021-10-01 08:00:00.000', '2021-10-01 08:00:00.000', '2021-10-21 08:00:00.000', 'Completed'),
		(booking15, userId1, '2021-10-01 08:00:00.000', '2021-10-01 08:00:00.000', '2021-10-26 08:00:00.000', 'Completed'),
		(booking16, userId1, '2021-10-01 08:00:00.000', '2021-10-01 08:00:00.000', '2021-10-27 08:00:00.000', 'Completed'),
		(booking17, userId1, '2021-10-01 08:00:00.000', '2021-10-01 08:00:00.000', '2021-10-03 04:00:00.000', 'Completed'),
		(booking18, userId1, '2021-10-01 08:00:00.000', '2021-10-01 08:00:00.000', '2021-10-03 12:00:00.000', 'Completed'),
		(booking19, userId1, '2021-10-01 08:00:00.000', '2021-10-01 08:00:00.000', '2021-10-03 20:00:00.000', 'Completed'),
		(booking20, userId1, '2021-10-01 08:00:00.000', '2021-10-01 08:00:00.000', '2021-10-03 23:00:00.000', 'Completed');
		
end $$;





	
	


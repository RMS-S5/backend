CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

delete from order_food_item;
delete from "order";
delete from order_status;
delete from cart_item;
delete from "cart";

delete from customer;
delete from staff;
delete from user_account;
delete from account_type;

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

	order1 uuid  := uuid_generate_v4();
	order2 uuid  := uuid_generate_v4();
	order3 uuid  := uuid_generate_v4();
	order4 uuid  := uuid_generate_v4();
	order5 uuid  := uuid_generate_v4();
	order6 uuid  := uuid_generate_v4();
	order7 uuid  := uuid_generate_v4();
	order8 uuid  := uuid_generate_v4();
	order9 uuid  := uuid_generate_v4();
	order10 uuid  := uuid_generate_v4();
	order11 uuid  := uuid_generate_v4();
	order12 uuid  := uuid_generate_v4();
	order13 uuid  := uuid_generate_v4();
	order14 uuid  := uuid_generate_v4();
	order15 uuid  := uuid_generate_v4();
	order16 uuid  := uuid_generate_v4();
	order17 uuid  := uuid_generate_v4();
	order18 uuid  := uuid_generate_v4();
	order19 uuid  := uuid_generate_v4();
	order20 uuid  := uuid_generate_v4();
	
	booking1 uuid := uuid_generate_v4();
	booking2 uuid := uuid_generate_v4();
	booking3 uuid := uuid_generate_v4();
	booking4 uuid := uuid_generate_v4();
	booking5 uuid := uuid_generate_v4();
	booking6 uuid := uuid_generate_v4();
	booking7 uuid := uuid_generate_v4();
	booking8 uuid := uuid_generate_v4();
	booking9 uuid := uuid_generate_v4();
	booking10 uuid := uuid_generate_v4();
	booking11 uuid := uuid_generate_v4();
	booking12 uuid := uuid_generate_v4();
	booking13 uuid := uuid_generate_v4();
	booking14 uuid := uuid_generate_v4();
	booking15 uuid := uuid_generate_v4();
	booking16 uuid := uuid_generate_v4();
	booking17 uuid := uuid_generate_v4();
	booking18 uuid := uuid_generate_v4();
	booking19 uuid := uuid_generate_v4();
	booking20 uuid := uuid_generate_v4();
	booking21 uuid := uuid_generate_v4();
	booking22 uuid := uuid_generate_v4();
	booking23 uuid := uuid_generate_v4();
	booking24 uuid := uuid_generate_v4();

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
		'photos-95122727-057b-45e4-9abb-e48461ad147f.jpg',
		350.00 ),
		(foodItem2 , 'Cheese Kottu', category1, 'Delicious Cheese Kottu',
		'photos-c16d111f-c8bf-4a63-9b29-80a8b8fc6c01.jpg', 
		500.00 ),
		(foodItem3 , 'Egg Kottu', category1, 'Delicious Egg Kottu',
		'photos-019fb369-c625-4ee0-b7bb-c440033743f4.jpg', 
		250.00 ),
		(foodItem4 , 'Dolphin Kottu', category1,'Delicious Dolphin Kottu',
		'photos-64cd303f-ff51-46c2-a7df-71983a33f7e4.jpg', 
		250.00 ),
		(foodItem5 , 'Chicken Pizza', category4, 'Delicious Chicken Pizza',
		'photos-ce5b3cee-e364-4f7e-bf31-7f21704c8baa.jpg',
		700.00 ),
		(foodItem6 , 'Cheese Pizza', category4, 'Delicious Cheese Pizza',
		'photos-731c6feb-d8b5-4c24-8d91-df462e0220bb.jpg',
		750.00 ),
		(foodItem7 , 'Veggie Pizza', category4, 'Delicious Veggie Pizza',
		'photos-15d4c517-6137-4033-be4d-0d4a9e39d9c1.jpg',
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
		(branchId1, 8, uuid_generate_v4()),
		(branchId2, 1, uuid_generate_v4()),
		(branchId2, 2, uuid_generate_v4()),
		(branchId2, 3, uuid_generate_v4()),
		(branchId2, 4, uuid_generate_v4()),
		(branchId2, 5, uuid_generate_v4()),
		(branchId2, 6, uuid_generate_v4()),
		(branchId2, 7, uuid_generate_v4()),
		(branchId2, 8, uuid_generate_v4());

	insert into "room_type" ("room_type", "description") values
		('Suite', 'Suite Room'),
		('Deluxe', 'Deluxe Room'),
		('Vip', 'Vip Room');

	insert into "room" ("room_number", "branch_id", "capacity", "room_type", "price") values
		('1', branchId1, '2', 'Suite', '22000'),
		('2', branchId1, '3', 'Suite', '32000'),
		('3', branchId1, '1', 'Vip', '20000'),
		('1', branchId2, '2', 'Deluxe', '42000'),
		('2', branchId2, '3', 'Suite', '32000'),
		('3', branchId2, '4', 'Suite', '52000');

	insert into "order" ("order_id", "customer_id", "total_amount", "table_number", "branch_id", "order_status", "placed_time", "waiter_id", "kitchen_staff_id") values
		(order1, userId1, 20000, 1, branchId1, 'Served', '2021-11-01 08:00:00.000', userId3, userId2),
		(order2, userId1, 3000, 1, branchId1, 'Served', '2021-11-11 08:00:00.000', userId3, userId2),
		(order3, userId1, 4000, 1, branchId1, 'Served', '2021-11-16 08:00:00.000', userId3, userId2),
		(order4, userId1, 23000, 1, branchId1, 'Served', '2021-11-21 08:00:00.000', userId3, userId2),
		(order5, userId1, 2200, 1, branchId1, 'Served', '2021-11-26 08:00:00.000', userId3, userId2),
		(order6, userId1, 20100, 1, branchId1, 'Served', '2021-11-27 08:00:00.000', userId3, userId2),
		(order7, userId1, 5000, 1, branchId1, 'Served', '2021-11-11 04:00:00.000', userId3, userId2),
		(order8, userId1, 6000, 1, branchId1, 'Served', '2021-11-11 12:00:00.000', userId3, userId2),
		(order9, userId1, 7000, 1, branchId1, 'Served', '2021-11-11 20:00:00.000', userId3, userId2),
		(order10, userId1, 24000, 1, branchId1, 'Served', '2021-11-11 23:00:00.000', userId3, userId2),
		(order11, userId1, 20000, 1, branchId2, 'Served', '2021-11-01 08:00:00.000', userId3, userId2),
		(order12, userId1, 3000, 1, branchId2, 'Served', '2021-11-11 08:00:00.000', userId3, userId2),
		(order13, userId1, 4000, 1, branchId2, 'Served', '2021-11-16 08:00:00.000', userId3, userId2),
		(order14, userId1, 23000, 1, branchId2, 'Served', '2021-11-21 08:00:00.000', userId3, userId2),
		(order15, userId1, 2200, 1, branchId2, 'Served', '2021-11-26 08:00:00.000', userId3, userId2),
		(order16, userId1, 20100, 1, branchId2, 'Served', '2021-11-27 08:00:00.000', userId3, userId2),
		(order17, userId1, 5000, 1, branchId2, 'Served', '2021-11-11 04:00:00.000', userId3, userId2),
		(order18, userId1, 6000, 1, branchId2, 'Served', '2021-11-11 12:00:00.000', userId3, userId2),
		(order19, userId1, 7000, 1, branchId2, 'Served', '2021-11-03 20:00:00.000', userId3, userId2),
		(order20, userId1, 24000, 1, branchId2, 'Served', '2021-11-03 23:00:00.000', userId3, userId2);

	insert into "booking" ("booking_id", "customer_id", "arrival", "departure", "placed_time", "status") values
		(booking21, userId1, '2021-11-01 08:00:00.000', '2021-11-01 08:00:00.000', '2021-11-01 08:00:00.000', 'Placed'),
		(booking22, userId1, '2021-11-01 08:00:00.000', '2021-11-01 08:00:00.000', '2021-11-01 08:00:00.000', 'Placed'),
		(booking23, userId1, '2021-11-01 08:00:00.000', '2021-11-01 08:00:00.000', '2021-11-01 08:00:00.000', 'Accepted'),
		(booking24, userId1, '2021-11-01 08:00:00.000', '2021-11-01 08:00:00.000', '2021-11-01 08:00:00.000', 'Lodged'),
		(booking1, userId1, '2021-11-01 08:00:00.000', '2021-11-01 08:00:00.000', '2021-11-01 08:00:00.000', 'Completed'),
		(booking2, userId1, '2021-11-01 08:00:00.000', '2021-11-01 08:00:00.000', '2021-11-11 08:00:00.000', 'Completed'),
		(booking3, userId1, '2021-11-01 08:00:00.000', '2021-11-01 08:00:00.000', '2021-11-16 08:00:00.000', 'Completed'),
		(booking4, userId1, '2021-11-01 08:00:00.000', '2021-11-01 08:00:00.000', '2021-11-21 08:00:00.000', 'Completed'),
		(booking5, userId1, '2021-11-01 08:00:00.000', '2021-11-01 08:00:00.000', '2021-11-26 08:00:00.000', 'Completed'),
		(booking6, userId1, '2021-11-01 08:00:00.000', '2021-11-01 08:00:00.000', '2021-11-27 08:00:00.000', 'Completed'),
		(booking7, userId1, '2021-11-01 08:00:00.000', '2021-11-01 08:00:00.000', '2021-11-11 04:00:00.000', 'Completed'),
		(booking8, userId1, '2021-11-01 08:00:00.000', '2021-11-01 08:00:00.000', '2021-11-11 12:00:00.000', 'Completed'),
		(booking9, userId1, '2021-11-01 08:00:00.000', '2021-11-01 08:00:00.000', '2021-11-11 20:00:00.000', 'Completed'),
		(booking10, userId1, '2021-11-01 08:00:00.000', '2021-11-01 08:00:00.000', '2021-11-11 23:00:00.000', 'Completed'),
		(booking11, userId1, '2021-11-01 08:00:00.000', '2021-11-01 08:00:00.000', '2021-11-01 08:00:00.000', 'Completed'),
		(booking12, userId1, '2021-11-01 08:00:00.000', '2021-11-01 08:00:00.000', '2021-11-11 08:00:00.000', 'Completed'),
		(booking13, userId1, '2021-11-01 08:00:00.000', '2021-11-01 08:00:00.000', '2021-11-16 08:00:00.000', 'Completed'),
		(booking14, userId1, '2021-11-01 08:00:00.000', '2021-11-01 08:00:00.000', '2021-11-21 08:00:00.000', 'Completed'),
		(booking15, userId1, '2021-11-01 08:00:00.000', '2021-11-01 08:00:00.000', '2021-11-26 08:00:00.000', 'Completed'),
		(booking16, userId1, '2021-11-01 08:00:00.000', '2021-11-01 08:00:00.000', '2021-11-27 08:00:00.000', 'Completed'),
		(booking17, userId1, '2021-11-01 08:00:00.000', '2021-11-01 08:00:00.000', '2021-11-03 04:00:00.000', 'Completed'),
		(booking18, userId1, '2021-11-01 08:00:00.000', '2021-11-01 08:00:00.000', '2021-11-03 12:00:00.000', 'Completed'),
		(booking19, userId1, '2021-11-01 08:00:00.000', '2021-11-01 08:00:00.000', '2021-11-03 20:00:00.000', 'Completed'),
		(booking20, userId1, '2021-11-01 08:00:00.000', '2021-11-01 08:00:00.000', '2021-11-03 23:00:00.000', 'Completed');

insert into "booked_room" ("booking_id", "branch_id", "room_number") values
		(booking1, branchId1, '1'),
		(booking1, branchId1, '2'),
		(booking1, branchId1, '3'),
		(booking2, branchId1, '1'),
		(booking2, branchId1, '2'),
		(booking3, branchId1, '3'),
		(booking4, branchId1, '1'),
		(booking5, branchId1, '2'),
		(booking6, branchId1, '3'),
		(booking6, branchId1, '1'),
		(booking6, branchId1, '2'),
		(booking7, branchId1, '3'),
		(booking7, branchId1, '1'),
		(booking8, branchId1, '2'),
		(booking8, branchId1, '3'),
		(booking9, branchId1, '1'),
		(booking10, branchId1, '2'),
		(booking10, branchId1, '3'),
		(booking11, branchId2, '1'),
		(booking11, branchId2, '2'),
		(booking11, branchId2, '3'),
		(booking12, branchId2, '1'),
		(booking12, branchId2, '2'),
		(booking13, branchId2, '3'),
		(booking14, branchId2, '1'),
		(booking15, branchId2, '2'),
		(booking16, branchId2, '3'),
		(booking16, branchId2, '1'),
		(booking16, branchId2, '2'),
		(booking17, branchId2, '3'),
		(booking17, branchId2, '1'),
		(booking18, branchId2, '2'),
		(booking18, branchId2, '3'),
		(booking19, branchId2, '1'),
		(booking20, branchId2, '2'),
		(booking20, branchId2, '3');	
end $$;



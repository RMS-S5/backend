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
	
	insert into user_account("user_id", "first_name", "last_name", "email", "account_type", "password") values
	(userId1, 'John', 'Doe', 'johndoe@gmail.com', 'Customer' , '$2b$10$WKtfDvEY5/FVdOb81yKjAO5MLcgeEazC5gdPal70uybfjhxRtOm0m'),
	(userId2, 'Darshana', 'Fernando', 'darshana@gmail.com','Kitchen Staff', '$2b$10$WKtfDvEY5/FVdOb81yKjAO5MLcgeEazC5gdPal70uybfjhxRtOm0m' ),
	(userId3, 'Nuwan', 'Pranandu', 'nuwan@gmail.com',  'Waiter' , '$2b$10$WKtfDvEY5/FVdOb81yKjAO5MLcgeEazC5gdPal70uybfjhxRtOm0m'),
	(userId4, 'Nagitha', 'Jayasekara', 'nagitha@gmail.com',  'Manager' , '$2b$10$WKtfDvEY5/FVdOb81yKjAO5MLcgeEazC5gdPal70uybfjhxRtOm0m'),
	(userId5, 'Dumindu', 'Silva', 'dumindu@gmail.com',  'Branch Manager' , '$2b$10$WKtfDvEY5/FVdOb81yKjAO5MLcgeEazC5gdPal70uybfjhxRtOm0m'),
	(userId6, 'Harsha', 'Perera', 'harsha@gmail.com',  'Receptionist' , '$2b$10$WKtfDvEY5/FVdOb81yKjAO5MLcgeEazC5gdPal70uybfjhxRtOm0m');

	insert into customer("user_id", "mobile_number") values
		(userId1, 0784539687);
	
	insert into staff("user_id", "branch_id", "mobile_number", "nic") values
		(userId2 , branchId1 , 0746597284, '197854628887V'),
		(userId3 , branchId1 , 0776597225, '199954628887V'),
		(userId4 , null, 0786597236, '199754628887V'),
		(userId5 , branchId1 , 0756597251, '200154628887V'),
		(userId6 , branchId1 , 0783597222, '200154628257V');

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

	

		
end $$;





	
	


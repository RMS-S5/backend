CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
delete from user_account;
delete from account_type;
delete from order_status;
delete from category ;
delete from food_variant;
delete from food_item ;
-- Insert user types
insert into account_type values 
	('Customer'),
	('Waiter'),
	('Kitchen Staff'),
	('Manager');
	
--insert user accounts
insert into user_account values
	(uuid_generate_v4(), 'John', 'Doe', 'johndoe@gmail.com', 'Customer' , '123456'),
	(uuid_generate_v4(), 'Darshana', 'Fernando', 'darshana@gmail.com','Kitchen Staff', '123456' ),
	(uuid_generate_v4(), 'Nuwan', 'Pranandu', 'nuwan@gmail.com',  'Waiter' , '123456');

insert into order_status values
	('Placed'),
	('Preparing'),
	('Prepared'),
	('Waiter Assigned'),
	('Rejected'),
	('Served');


do $$
declare
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
begin
	insert into category values
		(category1, 'Kottu', 'Delicious Kottu'),
		(category2, 'Fried Rice', 'Delicious Fried Rice'),
		(category3, 'Burger', 'Delicious Burger'),
		(category4, 'Pizza', 'Delicious Pizza'),
		(category5, 'Roti', 'Delicious Roti');
	
	insert into food_item("food_item_id", "name", "category_id", "description", "image_url", "price")
		values
		(foodItem1 , 'Chicken Kottu', category1, 'Delicious Chicken Kottu','https://picsum.photos/id/231/300/200', 350.00 ),
		(foodItem2 , 'Cheese Kottu', category1, 'Delicious Cheese Kottu','https://picsum.photos/id/232/300/200', 500.00 ),
		(foodItem3 , 'Egg Kottu', category1, 'Delicious Egg Kottu','https://picsum.photos/id/233/300/200', 250.00 ),
		(foodItem4 , 'Dolphin Kottu', category1, 'Delicious Dolphin Kottu','https://picsum.photos/id/234/300/200', 250.00 ),
		(foodItem5 , 'Chicken Pizza', category2, 'Delicious Chicken Pizza','https://picsum.photos/id/235/300/200', 700.00 ),
		(foodItem6 , 'Cheese Pizza', category2, 'Delicious Cheese Pizza','https://picsum.photos/id/236/300/200', 750.00 ),
		(foodItem7 , 'Veggie Pizza', category2, 'Delicious Veggie Pizza','https://picsum.photos/id/237/300/200', 600.00 );
	
	call set_food_variants(foodItem1, '[{"variant_name" : "Small", "price" : 350.00}, {"variant_name" : "Medium", "price" : 450.00}]');
	call set_food_variants(foodItem2, '[{"variant_name" : "Small", "price" : 500.00}, {"variant_name" : "Medium", "price" : 650.00}]');
	call set_food_variants(foodItem3, '[{"variant_name" : "Small", "price" : 250.00}, {"variant_name" : "Medium", "price" : 350.00}]');
	call set_food_variants(foodItem4, '[{"variant_name" : "Small", "price" : 250.00}, {"variant_name" : "Medium", "price" : 450.00}]');
	call set_food_variants(foodItem5, '[{"variant_name" : "Small", "price" : 700.00}, {"variant_name" : "Medium", "price" : 1200.00}]');
	call set_food_variants(foodItem6, '[{"variant_name" : "Small", "price" : 750.00}, {"variant_name" : "Medium", "price" : 1100.00}]');
	call set_food_variants(foodItem7, '[{"variant_name" : "Small", "price" : 600.00}, {"variant_name" : "Medium", "price" : 1000.00}]');
		
end $$;



	
	


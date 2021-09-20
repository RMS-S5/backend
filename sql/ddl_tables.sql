-- ###############################################
-- Hotel and Restaurant Management System Database
-- ###############################################
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
--drop
drop procedure if exists set_order_items ;
drop procedure if exists set_food_variants ;

-- Drop existing tables
DROP TABLE IF EXISTS "booked_room";
DROP TABLE IF EXISTS "booking";

DROP TABLE IF EXISTS "room";
DROP TABLE IF EXISTS "room_type";

drop view if exists "orders_with_cart_items";
DROP TABLE IF EXISTS "order_food_item";
DROP TABLE IF EXISTS "order";
DROP TABLE IF EXISTS "order_status";

drop view if exists "cart_items_detailed";
DROP TABLE IF EXISTS "cart_item";
DROP TABLE IF EXISTS "cart";

drop view if exists food_items_with_variants;
DROP TABLE IF EXISTS "food_variant";
DROP TABLE IF EXISTS "food_item";
DROP TABLE IF EXISTS "category";

drop view if exists "user_full_data";
DROP TABLE IF EXISTS "staff";
DROP TABLE IF EXISTS "staff_role";

DROP TABLE IF EXISTS "table";
DROP TABLE IF EXISTS "branch";

DROP TABLE IF EXISTS "customer_report";
DROP TABLE IF EXISTS "customer_review";
DROP TABLE IF EXISTS "customer";


DROP TABLE IF EXISTS "user_account";
DROP TABLE IF EXISTS "account_type";

--
-- Tables
--
-- User account
CREATE TABLE "account_type"(
	account_type VARCHAR(100) PRIMARY KEY
);

-- User account
CREATE TABLE "user_account"(
	user_id UUID PRIMARY KEY,
	first_name VARCHAR(100),
	last_name VARCHAR(100),
	email VARCHAR(100),
	account_type VARCHAR(100),
	"password" VARCHAR(100),
	active BOOLEAN default true,
	CONSTRAINT user_account_email_unique UNIQUE (email),
	CONSTRAINT fk_c_user_type_constraint FOREIGN KEY (account_type) REFERENCES "account_type"("account_type") ON UPDATE CASCADE
);

-- Customer
CREATE TABLE "customer"(
	user_id UUID PRIMARY KEY,
	mobile_number VARCHAR(20),
	account_level SMALLINT,
	active BOOLEAN default true,
	CONSTRAINT fk_c_user_id_constraint FOREIGN KEY (user_id) REFERENCES "user_account"("user_id") ON UPDATE CASCADE
);

CREATE TABLE "customer_review"(
	customer_review_id UUID PRIMARY KEY,
	customer_id UUID,
	rating SMALLINT,
	"description" VARCHAR(250),
	recommendation VARCHAR(250),
	active BOOLEAN default true,
	CONSTRAINT fk_crw_customer_id_constraint FOREIGN KEY (customer_id) REFERENCES "customer"("user_id") ON UPDATE CASCADE
);

CREATE TABLE "customer_report"(
	customer_report_id UUID PRIMARY KEY,
	user_id UUID,
	mobile_number VARCHAR(15),
	"description" VARCHAR(250),
	customer_name VARCHAR(100),
	active BOOLEAN default true,
	CONSTRAINT fk_crp_user_id_constraint FOREIGN KEY (user_id) REFERENCES "customer"("user_id") ON UPDATE CASCADE
);


-- Branch
CREATE TABLE "branch"(
	branch_id UUID PRIMARY KEY,
	branch_name VARCHAR(100),
	active BOOLEAN default true
);

CREATE TABLE "table"(
	table_number INTEGER,
	branch_id UUID,
	verification_code VARCHAR(90),
	last_update_time TIMESTAMP,
	active BOOLEAN default true,
	PRIMARY KEY("table_number", "branch_id"),
	CONSTRAINT fk_t_branch_id_constraint FOREIGN KEY (branch_id) REFERENCES "branch"("branch_id") ON UPDATE CASCADE
);

-- Staff
--CREATE TABLE "staff_role"(
--	role VARCHAR(100) PRIMARY KEY,
--	"description" VARCHAR(250)
--);

CREATE TABLE "staff"(
	user_id UUID PRIMARY KEY,
--	"role" VARCHAR(100),
	branch_id UUID,
	birthday TIMESTAMP,
	mobile_number VARCHAR(15),
	nic VARCHAR(15),
	active BOOLEAN default true,
	constraint fk_s_user_id_constraint FOREIGN key ("user_id") references "user_account"(user_id) on update cascade,
--	CONSTRAINT fk_s_role_constraint FOREIGN KEY (role) REFERENCES "staff_role"("role") ON UPDATE CASCADE,
	CONSTRAINT fk_s_branch_id_constraint FOREIGN KEY (branch_id) REFERENCES "branch"("branch_id") ON UPDATE CASCADE
);

create view user_full_data as select
	user_account.*,
	customer.mobile_number ,
	staff.branch_id,
	staff.nic,
	staff.birthday
from user_account
	left join customer
	on user_account.user_id = customer.user_id
	left join staff
	on  user_account.user_id = staff.user_id;

-- Food item
CREATE TABLE "category"(
	category_id UUID PRIMARY KEY,
	category_name VARCHAR(75),
	"description" VARCHAR(250),
	image_url VARCHAR(150) default null,
	active BOOLEAN default true
);

CREATE TABLE "food_item"(
	food_item_id UUID PRIMARY KEY,
	"name" VARCHAR(75),
	category_id UUID,
	"description" VARCHAR(250),
	image_url VARCHAR(150),
	price NUMERIC(10,2),
	active BOOLEAN default true,
	CONSTRAINT fk_fi_category_id_constraint FOREIGN KEY (category_id) REFERENCES "category"("category_id") ON UPDATE CASCADE
);

CREATE TABLE "food_variant"(
	food_variant_id UUID PRIMARY KEY,
	food_item_id UUID,
	variant_name VARCHAR(75),
	price NUMERIC(10,2),
	active BOOLEAN default true,
	CONSTRAINT fk_fV_food_item_id_constraint FOREIGN KEY (food_item_id) REFERENCES "food_item"("food_item_id") ON UPDATE CASCADE
);

--view food items with variants
create view food_items_with_variants as select
	food_item.* ,
	json_agg(json_build_object(
	'foodVariantId', food_variant_id,
	'foodItemId', food_item_id,
	'variantName', variant_name,
	'price', price
	)) as food_variants
	from food_item natural join food_variant where food_item.active = true group by food_item_id ;



-- Cart
CREATE TABLE "cart"(
	cart_id UUID PRIMARY KEY,
	customer_id UUID,
	CONSTRAINT fk_c_customer_id_constraint FOREIGN KEY (customer_id) REFERENCES "customer"("user_id") ON UPDATE CASCADE
);

CREATE TABLE "cart_item"(
	cart_item_id UUID PRIMARY KEY,
	food_item_id UUID,
	variant_id UUID,
	price NUMERIC(10,2),
	cart_id UUID,
	quantity INTEGER,
	active BOOLEAN default true,
	CONSTRAINT fk_ci_food_item_id_constraint FOREIGN KEY (food_item_id) REFERENCES "food_item"("food_item_id") ON UPDATE CASCADE,
	CONSTRAINT fk_ci_variant_id_constraint FOREIGN KEY (variant_id) REFERENCES "food_variant"("food_variant_id") ON UPDATE CASCADE,
	CONSTRAINT fk_ci_cart_id_constraint FOREIGN KEY (cart_id) REFERENCES "cart"("cart_id") ON UPDATE CASCADE
);

--Cart items with food item names and variant names
create view cart_items_detailed as select
	cart_item.* ,
	food_item."name",
	food_item."image_url",
	food_item."category_id",
	food_item."description",
	food_variant."variant_name"
	from cart_item join food_item
		on cart_item.food_item_id = food_item.food_item_id
	join food_variant
	on cart_item.variant_id = food_variant.food_variant_id;


-- Order
CREATE TABLE "order_status"(
	order_status VARCHAR(100) PRIMARY KEY,
	"description" VARCHAR(250)
);

CREATE TABLE "order"(
	order_id UUID PRIMARY KEY,
	customer_id UUID,
	total_amount NUMERIC(10,2),
	table_number INTEGER,
	branch_id UUID,
	order_status VARCHAR(100),
	placed_time TIMESTAMP,
	waiter_id UUID,
	kitchen_staff_id UUID,
	active BOOLEAN default true,
	CONSTRAINT fk_o_customer_id_constraint FOREIGN KEY (customer_id) REFERENCES "customer"("user_id") ON UPDATE CASCADE,
	CONSTRAINT fk_o_tn_bi_constraint FOREIGN KEY (table_number, branch_id) REFERENCES "table"("table_number", "branch_id") ON UPDATE CASCADE,
	CONSTRAINT fk_o_order_status_constraint FOREIGN KEY (order_status) REFERENCES "order_status"("order_status") ON UPDATE cascade,
	CONSTRAINT fk_o_waiter_id_constraint FOREIGN KEY (waiter_id) REFERENCES "staff"("user_id") ON UPDATE CASCADE,
	CONSTRAINT fk_o_kitchen_staff_id_constraint FOREIGN KEY (kitchen_staff_id) REFERENCES "staff"("user_id") ON UPDATE CASCADE
);

CREATE TABLE "order_food_item"(
	order_id UUID,
	cart_item_id UUID,

	PRIMARY KEY ("order_id", "cart_item_id"),
	CONSTRAINT fk_ofi_order_id_constraint FOREIGN KEY (order_id) REFERENCES "order"("order_id") ON UPDATE CASCADE,
	CONSTRAINT fk_ofi_cart_item_id_constraint FOREIGN KEY (cart_item_id) REFERENCES "cart_item"("cart_item_id") ON UPDATE CASCADE
);

--view orders with cart items
create view orders_with_cart_items as select
	"order".*,
	json_agg(json_build_object(
	'cartItemId', cart_items_detailed.cart_item_id,
	'foodItemId', cart_items_detailed.food_item_id,
	'variantId' , cart_items_detailed.variant_id,
	'price' , cart_items_detailed.price,
	'cartId' , cart_items_detailed.cart_id,
	'image_url' , cart_items_detailed.image_url,
	'description' , cart_items_detailed.description,
	'quantity' , cart_items_detailed.quantity,
	'name' , cart_items_detailed."name",
	'categoryId' , cart_items_detailed.category_id,
	'variantName' , cart_items_detailed.variant_name
	)) as cart_items
	from "order"
	left join "order_food_item"
		on "order".order_id  = order_food_item.order_id
	left join cart_items_detailed
		on "order_food_item".cart_item_id = cart_items_detailed.cart_item_id
	group by "order".order_id ;

-- Room
CREATE TABLE "room_type"(
	room_type VARCHAR(100) PRIMARY KEY,
	"description" VARCHAR(250)
);

CREATE TABLE "room"(
	room_number INTEGER,
	branch_id UUID,
	capacity smallint,
	room_type VARCHAR(100),
	price NUMERIC(10,2),
	active BOOLEAN default true,
	PRIMARY KEY("room_number", "branch_id"),
	CONSTRAINT fk_r_branch_id_constraint FOREIGN KEY (branch_id) REFERENCES "branch"("branch_id") ON UPDATE CASCADE,
	CONSTRAINT fk_r_room_type_constraint FOREIGN KEY (room_type) REFERENCES "room_type"("room_type") ON UPDATE CASCADE
);

-- Booking
CREATE TABLE "booking"(
	booking_id UUID PRIMARY KEY,
	customer_id UUID,
	arrival TIMESTAMP,
	departure TIMESTAMP,
	active BOOLEAN default true,
	CONSTRAINT fk_b_customer_id_constraint FOREIGN KEY (customer_id) REFERENCES "customer"("user_id") ON UPDATE CASCADE
);

CREATE TABLE "booked_room"(
	booking_id UUID,
	room_number INTEGER,
	branch_id UUID,
	active BOOLEAN default true,
	PRIMARY KEY ("booking_id","room_number","branch_id"),
	CONSTRAINT fk_br_booking_id_constraint FOREIGN KEY (booking_id) REFERENCES "booking"("booking_id") ON UPDATE CASCADE,
	CONSTRAINT fk_br_rn_bi_constraint FOREIGN KEY (room_number, branch_id) REFERENCES "room"("room_number", "branch_id") ON UPDATE CASCADE
);


--Insert food variants
create or replace PROCEDURE set_food_variants(f_id uuid, food_variants JSON)
LANGUAGE plpgsql
AS $pn$
	DECLARE
		_variant json;
	begin
		DELETE FROM food_variant WHERE food_item_id = f_id;
		FOR _variant IN SELECT * FROM (SELECT json_array_elements (food_variants)) ci
		loop
			insert into food_variant values(uuid_generate_v4(), f_id, _variant::json->>'variant_name', cast(_variant::json->>'price' as numeric(10,2)));
		END loop ;
	END ;
$pn$;



--Insert order items
create or replace PROCEDURE set_order_items(o_id uuid, order_items JSON)
LANGUAGE plpgsql
AS $pn$
	DECLARE
		_order_item uuid;
	begin
		DELETE FROM order_food_item WHERE order_id = o_id;
		FOR _order_item IN SELECT * FROM (SELECT json_array_elements_text(order_items)) ci
		loop
			insert into order_food_item values(o_id, _order_item);
		END loop ;
	END ;
$pn$;


-- ###############################################
-- Hotel and Restaurant Management System Database
-- ###############################################

-- Drop existing tables
DROP TABLE IF EXISTS "booked_room";
DROP TABLE IF EXISTS "booking";

DROP TABLE IF EXISTS "room";
DROP TABLE IF EXISTS "room_type";

DROP TABLE IF EXISTS "order_food_item";
DROP TABLE IF EXISTS "order";
DROP TABLE IF EXISTS "order_status";

DROP TABLE IF EXISTS "staff";
DROP TABLE IF EXISTS "staff_role";

DROP TABLE IF EXISTS "table";
DROP TABLE IF EXISTS "branch";

DROP TABLE IF EXISTS "cart_item";
DROP TABLE IF EXISTS "cart";

DROP TABLE IF EXISTS "food_variant";
DROP TABLE IF EXISTS "food_item";
DROP TABLE IF EXISTS "category";

DROP TABLE IF EXISTS "customer_report";
DROP TABLE IF EXISTS "customer_review";
DROP TABLE IF EXISTS "customer";

DROP TABLE IF EXISTS "user_account";

--
-- Tables
--

-- User account
CREATE TABLE "user_account"(
	id UUID PRIMARY KEY,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	email VARCHAR(50),
	"password" VARCHAR(50)
);

-- Customer
CREATE TABLE "customer"(
	user_id UUID PRIMARY KEY,
	mobile_number VARCHAR(20),
	account_level SMALLINT,

	CONSTRAINT fk_c_user_id_constraint FOREIGN KEY (user_id) REFERENCES "user_account"("id") ON UPDATE CASCADE
);

CREATE TABLE "customer_review"(
	id UUID PRIMARY KEY,
	customer_id UUID,
	rating SMALLINT,
	"description" VARCHAR(250),
	recommendation VARCHAR(250),

	CONSTRAINT fk_crw_customer_id_constraint FOREIGN KEY (customer_id) REFERENCES "customer"("user_id") ON UPDATE CASCADE
);

CREATE TABLE "customer_report"(
	id UUID PRIMARY KEY,
	user_id UUID,
	mobile_number VARCHAR(15),
	"description" VARCHAR(250),
	customer_name VARCHAR(50),

	CONSTRAINT fk_crp_user_id_constraint FOREIGN KEY (user_id) REFERENCES "customer"("user_id") ON UPDATE CASCADE
);

-- Food item
CREATE TABLE "category"(
	id UUID PRIMARY KEY,
	category_name VARCHAR(75),
	"description" VARCHAR(250),
	image_url VARCHAR(150)
);

CREATE TABLE "food_item"(
	id UUID PRIMARY KEY,
	"name" VARCHAR(75),
	category_id UUID,
	"description" VARCHAR(250),
	image_url VARCHAR(150),
	price NUMERIC(10,2),

	CONSTRAINT fk_fi_category_id_constraint FOREIGN KEY (category_id) REFERENCES "category"("id") ON UPDATE CASCADE
);

CREATE TABLE "food_variant"(
	id UUID PRIMARY KEY,
	food_item_id UUID,
	variant_name VARCHAR(75),
	price NUMERIC(10,2),

	CONSTRAINT fk_fV_food_item_id_constraint FOREIGN KEY (food_item_id) REFERENCES "food_item"("id") ON UPDATE CASCADE
);

-- Cart
CREATE TABLE "cart"(
	id UUID PRIMARY KEY,
	customer_id UUID,

	CONSTRAINT fk_c_customer_id_contraint FOREIGN KEY (customer_id) REFERENCES "customer"("user_id") ON UPDATE CASCADE
);

CREATE TABLE "cart_item"(
	cart_item_id UUID PRIMARY KEY,
	food_item_id UUID,
	variant_id UUID,
	price NUMERIC(10,2),
	cart_id UUID,
	quantity INTEGER,

	CONSTRAINT fk_ci_food_item_id_constraint FOREIGN KEY (food_item_id) REFERENCES "food_item"("id") ON UPDATE CASCADE,
	CONSTRAINT fk_ci_variant_id_constraint FOREIGN KEY (variant_id) REFERENCES "food_variant"("id") ON UPDATE CASCADE,
	CONSTRAINT fk_ci_cart_id_constraint FOREIGN KEY (cart_id) REFERENCES "cart"("id") ON UPDATE CASCADE
);

-- Branch
CREATE TABLE "branch"(
	id UUID PRIMARY KEY,
	branch_name VARCHAR(100)
);

CREATE TABLE "table"(
	table_number INTEGER,
	branch_id UUID,
	verification_code VARCHAR(90),
	last_update_time TIMESTAMP,

	PRIMARY KEY("table_number", "branch_id"),
	CONSTRAINT fk_t_branch_id_constraint FOREIGN KEY (branch_id) REFERENCES "branch"("id") ON UPDATE CASCADE
);

-- Staff
CREATE TABLE "staff_role"(
	role VARCHAR(50) PRIMARY KEY,
	"description" VARCHAR(250)
);

CREATE TABLE "staff"(
	user_id UUID PRIMARY KEY,
	"role" VARCHAR(50),
	branch_id UUID,
	birthday TIMESTAMP,
	mobile_number VARCHAR(15),
	nic VARCHAR(15),

	CONSTRAINT fk_s_role_constraint FOREIGN KEY (role) REFERENCES "staff_role"("role") ON UPDATE CASCADE,
	CONSTRAINT fk_s_branch_id_constraint FOREIGN KEY (branch_id) REFERENCES "branch"("id") ON UPDATE CASCADE
);

-- Order
CREATE TABLE "order_status"(
	order_status VARCHAR(50) PRIMARY KEY,
	"description" VARCHAR(250)
);

CREATE TABLE "order"(
	order_id UUID PRIMARY KEY,
	customer_id UUID,
	total_amount NUMERIC(10,2),
	table_number INTEGER,
	branch_id UUID,
	order_status VARCHAR(50),

	CONSTRAINT fk_o_customer_id_contraint FOREIGN KEY (customer_id) REFERENCES "customer"("user_id") ON UPDATE CASCADE,
	CONSTRAINT fk_o_tn_bi_contraint FOREIGN KEY (table_number, branch_id) REFERENCES "table"("table_number", "branch_id") ON UPDATE CASCADE,
	CONSTRAINT fk_o_order_status_contraint FOREIGN KEY (order_status) REFERENCES "order_status"("order_status") ON UPDATE CASCADE
);

CREATE TABLE "order_food_item"(
	order_id UUID,
	cart_item_id UUID,

	PRIMARY KEY ("order_id", "cart_item_id"),
	CONSTRAINT fk_ofi_order_id_contraint FOREIGN KEY (order_id) REFERENCES "order"("order_id") ON UPDATE CASCADE,
	CONSTRAINT fk_ofi_cart_item_id_contraint FOREIGN KEY (cart_item_id) REFERENCES "cart_item"("cart_item_id") ON UPDATE CASCADE
);

-- Room
CREATE TABLE "room_type"(
	room_type VARCHAR(50) PRIMARY KEY,
	"description" VARCHAR(250)
);

CREATE TABLE "room"(
	room_number INTEGER,
	branch_id UUID,
	capacity smallint,
	room_type VARCHAR(50),
	price NUMERIC(10,2),

	PRIMARY KEY("room_number", "branch_id"),
	CONSTRAINT fk_r_branch_id_constraint FOREIGN KEY (branch_id) REFERENCES "branch"("id") ON UPDATE CASCADE,
	CONSTRAINT fk_r_room_type_constraint FOREIGN KEY (room_type) REFERENCES "room_type"("room_type") ON UPDATE CASCADE
);

-- Booking
CREATE TABLE "booking"(
	id UUID PRIMARY KEY,
	customer_id UUID,
	arrival TIMESTAMP,
	departure TIMESTAMP,

	CONSTRAINT fk_b_customer_id_constraint FOREIGN KEY (customer_id) REFERENCES "customer"("user_id") ON UPDATE CASCADE
);

CREATE TABLE "booked_room"(
	booking_id UUID,
	room_number INTEGER,
	branch_id UUID,

	PRIMARY KEY ("booking_id","room_number","branch_id"),
	CONSTRAINT fk_br_booking_id_constraint FOREIGN KEY (booking_id) REFERENCES "booking"("id") ON UPDATE CASCADE,
	CONSTRAINT fk_br_rn_bi_constraint FOREIGN KEY (room_number, branch_id) REFERENCES "room"("room_number", "branch_id") ON UPDATE CASCADE
);







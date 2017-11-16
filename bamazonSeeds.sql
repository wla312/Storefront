-- drops the bamazon_db if it exists currently
DROP DATABASE IF EXISTS bamazon_db;

-- Creates the "bamazon_db" database
CREATE DATABASE bamazon_db;

-- "use" makes it so all of the following code will affect bamazon_db
USE bamazon_db;

-- create the table 'products' within bamazon_db
CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(45) NOT NULL,
	price DECIMAL(10,2) NULL,
	stock_quantity INT NULL,
	PRIMARY KEY (item_id)
);

-- populate the database // creates new rows containing data in all named columns...
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pliers", "hand tools", 12.50, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("hammer", "hand tools", 15.00, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("screwdriver", "hand tools", 10.00, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("nails", "consumables", 5.25, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("staples", "consumables", 4.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("screws", "consumables", 4.50, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("nuts", "consumables", 3.25, 43);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bolts", "consumables", 6.75, 36);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("drill", "power tools", 59.99, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("circular saw", "power tools", 72.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("staple gun", "power tools", 39.99, 5);


-- 
SELECT * FROM products;






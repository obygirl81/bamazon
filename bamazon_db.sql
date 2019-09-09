DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(75) NOT NULL,
  price DECIMAL(10,2),
  stock_quantity INT,
  product_sales DECIMAL(10,2) default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Curtains", "Home Improvement", 119.99, 10000),
       ("Blender", "Housewares", 89.99, 3000), 
       ("MacBook Pro", "Electronics", 3000.00, 11100), 
       ("Jeans", "Clothing", 49.98, 20000),
       ("Picture Frames", "Home Improvements", 19.95, 1300), 
       ("Toaster", "Housewares", 43.99, 300), 
       ("Ipad", "Electronics", 299.99, 5000), 
       ("T-Shirts", "Clothing", 29.99, 15000),
       ("Flower", "Lawn & Garden", 42.49, 1200), 
       ("Plant Fertilizer", "Lawn & Garden", 5.99, 400);

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  over_head_costs INT,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Home Improvement", 10000),
       ("Housewares", 3300);
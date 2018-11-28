DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;
CREATE TABLE products(
item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INTEGER(10) NOT NULL,
PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES
	("toothbrush", "health", 1.99, 50),
    ("matcha", "food", 10.43, 40),
    ("rat traps", "home", 8.03, 33),
    ("lightbulb", "home", 2.33, 80),
    ("office chair", "office", 120, 21),
    ("bicycle", "sport", 430.77, 8),
    ("graphics card", "electronics", 200, 28),
    ("movie", "software", 3.88, 999999),
    ("beef jerky", "food", 12.45, 403),
    ("backpack", "office", 44.67, 49);
    

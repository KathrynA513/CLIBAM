DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;
USE bamazon;

CREATE TABLE products (
 item_id INT NOT NULL,
 product_name VARCHAR(40),
 department_name VARCHAR(40),
 price DECIMAL(10,2),
 stock_quantity INT
);

INSERT INTO products 
VALUES (0, 'Scratching Post', 'Pets', 15.25, 5);

INSERT INTO products 
VALUES (1, '#2 Pencil', 'Office Supplies', 2.00, 100);

INSERT INTO products 
VALUES (2, 'Screen Cleaner', 'Electronics', 9.00, 4);

INSERT INTO products 
VALUES (3, 'Mouse Toy Pack', 'Pets', 6.00, 10);

INSERT INTO products 
VALUES (4, 'Fountain Pen', 'Office Supplies', 8.00, 5);

INSERT INTO products 
VALUES (5, 'Stylus', 'Electronics', 5.00, 5);

INSERT INTO products 
VALUES (6, 'Litterbox', 'Pets', 5, 50);

INSERT INTO products 
VALUES (7, 'Printer paper pack', 'Office Supplies', 4.00, 80);

INSERT INTO products 
VALUES (8, 'USB Cable', 'Electronics', 8.00, 10);

INSERT INTO products 
VALUES (9, 'Cat Playground', 'Pets', 60.00, 10);


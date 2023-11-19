INSERT INTO users (email, password, telegram) 
VALUES ('johndoe@example.com', 'password123', '@johndoe');

INSERT INTO items (title, description, price, location, seller_id, thumbnail_id) 
VALUES ('Item 1', 'Description for Item 1', 50.00, 'New York', 1, null),
       ('Item 2', 'Description for Item 2', 100.00, 'Los Angeles', 1, null);

INSERT INTO categories (name) 
VALUES ('Furniture'),
       ('Electronics'),
       ('Clothes'),
       ('Others');

INSERT INTO item_category (item_id, category_id)
VALUES (1, 1),
       (1, 2),
       (2, 2),
       (2, 3);

INSERT INTO claims (timestamp, item_id, user_id) 
VALUES ('2023-11-08 12:00:00', 1, 1),
       ('2023-11-08 12:00:00', 1, 1),
       ('2023-11-07 10:00:00', 2, 1);
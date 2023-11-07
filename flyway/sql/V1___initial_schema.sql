CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(100),
    telegram VARCHAR(100)
);

CREATE TABLE item_images (
    id SERIAL PRIMARY KEY,
    image BYTEA, -- assuming binary data for images
    order_num INTEGER,
    item_id INTEGER
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    description TEXT,
    price DECIMAL,
    location VARCHAR(100),
    seller_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    thumbnail_id INTEGER REFERENCES item_images(id) ON DELETE SET NULL
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE item_category (
    item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id),
    PRIMARY KEY (item_id, category_id)
);

CREATE TABLE claims (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP,
    item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

ALTER TABLE item_images
ADD CONSTRAINT fk_item_id
FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE;
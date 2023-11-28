CREATE TABLE users (
    id SERIAL PRIMARY KEY,   
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    telegram VARCHAR(100)
);

CREATE TABLE item_images (
    id SERIAL PRIMARY KEY,
    image BYTEA, -- assuming binary data for images
    item_id INTEGER
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    description TEXT,
    price DECIMAL,
    location VARCHAR(100),
    listed_at TIMESTAMP DEFAULT NOW(),
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
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, item_id)
);

ALTER TABLE item_images
ADD CONSTRAINT fk_item_id
FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE;
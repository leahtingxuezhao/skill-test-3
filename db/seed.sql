CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(500),
    password VARCHAR (20)
);

ALTER TABLE users 
ALTER COLUMN password SET DATA TYPE TEXT


CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    title VARCHAR(200),
    image TEXT,
    content TEXT
);

SELECT * FROM users;
SELECT * FROM blog_posts;
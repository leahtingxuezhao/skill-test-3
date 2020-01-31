CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(500),
    password varchar (20)
);

alter table users 
alter COLUMN password set data type text


CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    user_id INT references users(id),
    title VARCHAR(200),
    image TEXT,
    content TEXT
);

select * from users;
SELECT * FROM blog_posts;
select * from blog_posts
join users on users.id = blog_posts.user_id
where blog_posts.id = $1;
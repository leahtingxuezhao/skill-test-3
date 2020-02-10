select b.id, u.username as user, b.title, b.image, b.content, u.id as user_id
from blog_posts b
join users u (on u.id = b.user_id)
order by b.id desc;
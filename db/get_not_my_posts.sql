select b.id, u.username as user, b.title, b.image, b.content, u.id as user_id
from blog_posts b
join users u on (b.user_id = u.id)
where u.id != $1
order by u.id desc;
select b.id, u.username as user, b.title, b.image, b.content, u.id as user_id
from blog_posts b
join users u on (b.user_id = u.id)
WHERE u.username ILIKE ('%'||$1||'%')
OR b.title ILIKE ('%'||$1||'%')
OR b.content ILIKE ('%'||$1||'%')
ORDER BY b.id DESC;
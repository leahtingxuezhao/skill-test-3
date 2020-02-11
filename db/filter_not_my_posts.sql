select b.id, u.username as user, b.title, b.image, b.content, u.id as user_id
from blog_posts b
join users u on b.user_id = u.id
WHERE b.title LIKE '%'||$1||'%'
And user_id != $1
ORDER BY b.id DESC;
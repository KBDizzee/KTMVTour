import { postgresPool } from "../config/db.config";
import User from "./user.model";

export const getFeed = async (page: number = 1, limit: number = 1) => {
  const offset = (page - 1) * limit;

  const postInfo = await postgresPool.query(
    `
    SELECT 
    posts.id,
    posts.user_id,
    posts.caption,
    posts.created_at,
    posts.like_count,
    posts.comment_count,
    json_agg(
      json_build_object(
        'id', photos.id,
        'url', photos.photo_url,
        'order', photos.photo_order
      ) ORDER BY photos.photo_order
    ) AS photos
    FROM posts
    LEFT JOIN photos ON posts.id = photos.post_id
    GROUP BY posts.id
    ORDER BY posts.created_at DESC
    LIMIT $1 OFFSET $2
    `,
    [limit, offset]
  );

  const posts = postInfo.rows;

  if (posts.length === 0) {
    console.log(`No posts to show in feed`);
    return [];
  }

  // getting the unique user ids from every post
  const allUserIds = posts.map((post) => post.user_id);

  // getting the user data from our mongo database, just username and pfp is good enough I think:
  const all_users = await User.find({ _id: { $in: allUserIds } }).select(
    "username profilePicture"
  );

  // combining both postgres and mongo data into one for the post:
  const feed = posts.map((post) => {
    const user = all_users.find((user) => user._id.toString() === post.user_id);
    return {
      id: post.id,
      caption: post.caption,
      createdAt: post.created_at,
      likeCount: post.like_count,
      commentCount: post.comment_count,
      photos: post.photos,
      user: {
        id: user?._id,
        username: user?.username,
        profilePicture: user?.profilePicture,
      },
    };
  });

  return feed;
};

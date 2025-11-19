import { postgresPool } from "../config/db.config"
import User from "./user.model"

export const postCommentModel = async(userId:string,postId:string,content:string)=>{
  const client = await postgresPool.connect()
  try{
    await client.query("BEGIN")

    await client.query("INSERT INTO comments (user_id,post_id,content) VALUES ($1,$2,$3)",[userId,postId,content])

    // increment comment count for post:
    await client.query("UPDATE posts SET comment_count = comment_count + 1 WHERE id = $1",[postId])

    await client.query("COMMIT")
    return {success:true};
  }catch(err:any){
    client.query("ROLLBACK")
    throw err
  } finally{
    client.release()
  }
}

export const getCommentModel = async(page:number = 1,limit:number = 20, postId:string)=>{
  const offset = (page - 1) * limit;
  
  const commentInfo = await postgresPool.query(`
    SELECT 
    comments.id,
    comments.user_id,
    comments.post_id,
    comments.content,
    comments.created_at
    FROM comments
    WHERE comments.post_id = $1
    ORDER BY comments.created_at DESC
    LIMIT $2 OFFSET $3
    `,[postId,limit,offset])

  const comments = commentInfo.rows

  if (comments.length === 0){
    console.log(`No comments have been added to this post: ${postId}`);
    return [];
  }

  const allUserIds = comments.map((comment)=> comment.user_id);

  const all_users = await User.find({_id: {$in: allUserIds}}).select(
    "username profilePicture"
  );

  const CommentData = comments.map((comment)=>{
    const user = all_users.find((user)=> user._id.toString() === comment.user_id);
    return{
      id:comment.id,
      postId: comment.post_id,
      content: comment.content,
      createdAt: comment.created_at,
      user:{
        id:user?._id,
        username:user?.username,
        profilePicture: user?.profilePicture
      }
    }
  });

  return CommentData
}
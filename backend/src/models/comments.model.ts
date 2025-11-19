import { postgresPool } from "../config/db.config"

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
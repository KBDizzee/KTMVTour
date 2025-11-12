import { postgresPool } from "../config/db.config"
import CustomError from "../middlewares/error-handler.middleware"

export const likeModel = async(userId:string,postId:string)=>{
  const client = await postgresPool.connect()
  
  try{
    await client.query("BEGIN")

    // insert like
    await client.query("INSERT INTO LIKES (user_id,post_id) VALUES ($1,$2)",[userId,postId])

    // increment like counter on post
    await client.query("UPDATE posts SET like_count = like_count + 1 WHERE id = $1",[postId])

    await client.query("COMMIT")
    return {success:true}
  }catch(err:any){
    await client.query("ROLLBACK")
     if (err.code === "23505") { // PostgreSQL unique violation code
      throw new Error("Already liked this post");
    }
    throw err;
  } finally{
    await client.release()
  }
}

export const unlikeModel = async(userId:string, postId:string)=>{
  const client = await postgresPool.connect()
  try{
    await client.query("BEGIN")

    // get rid of like
    const deleteResult = await client.query("DELETE FROM likes WHERE user_id = $1 and post_id = $2 RETURNING id",[userId,postId])

    if(deleteResult.rows.length === 0){
      throw new CustomError(`Like not found`,404)
    }

    // decrement like counter
    await client.query("UPDATE posts SET like_count = like_count - 1 WHERE id = $1",[postId])

    client.query("COMMIT")
    return {
      success: true
    }
  }catch(err:any){
    client.query("ROLLBACK")
    throw err;
  }finally{
    client.release()
  }
}

export const checkIfLikedModel = async(userId:string,postId:string)=>{
  
  const result = await postgresPool.query("SELECT id FROM likes WHERE user_id = $1 AND post_id = $2",[userId,postId])

  return result.rows.length > 0 //true if liked and false if not liked
}
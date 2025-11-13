import { Schema } from "mongoose";
import { postgresPool } from "../config/db.config";

export const uploadPost = async (
  caption: string,
  userId: string,
  location:string
) => {
  const result1 = await postgresPool.query(
    "INSERT INTO posts (caption,user_id,location) VALUES ($1,$2,$3) RETURNING *",
    [caption, userId]
  );
  return result1.rows[0];
};

export const uploadPhotos = async (
  postId: string,
  photos: { url: string; order: number }[]
) => {
  // Insert all photos in one transaction for better performance
  const client = await postgresPool.connect();
  try {
    //client.query('BEGIN') initiates a transaction block.
    // This means that all subsequent SQL statements executed on that same client instance will be treated as part of a single, atomic unit of work.
    // Key features of this begin: Atomicity,Isolation,Consistency,Durability
    await client.query("BEGIN");

    for (const photo of photos) {
      await client.query(
        "INSERT INTO photos (post_id,photo_url, photo_order) VALUES ($1,$2,$3)",
        [postId, photo.url, photo.order]
      );
    }

    // finalises transaction block,
    await client.query("COMMIT");
  } catch (err) {
    // used to undo all changes made within the current database transaction
    client.query("ROLLBACK");
    throw err;
  } finally {
    // used to return client instance back to connection pool after it has been acquired using pool.connect(). 
    // crucial for efficient resource management and preventing application from exhausting available database connections.
    client.release();
  }
};

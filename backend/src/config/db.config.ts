import mongoose from 'mongoose';
import { Pool } from 'pg';
import 'dotenv/config';

export const connectmongoDB = (mongo_URI:string)=>{
  mongoose.connect(mongo_URI,{})
  .then(()=>{
    console.log(`Connected to MongoDB`)
  })
  .catch((err)=>{
    console.log(`MongoDB Connection Error:`,err)
  })
}

export const postgresPool = new Pool ({
  connectionString: process.env.POSTGRES_URI,
  ssl: {
    rejectUnauthorized: false, // Required for Render's SSL certs
  },
  idleTimeoutMillis: 10000, // close idle clients after 10s
  connectionTimeoutMillis: 5000, // fail fast if cannot connect
  max: 10,
})
  postgresPool.connect()
  .then(()=>{
    console.log(`Connected to PostgreSQL`)
  })
  .catch((err)=>{
    console.log(`PostgreSQL Connection Error:`,err)
  })


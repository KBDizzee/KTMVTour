//imports:
import express, {Request,Response} from 'express';
import 'dotenv/config'
import { connectmongoDB,postgresPool } from './config/db.config';
import { errorHandler } from './middlewares/error-handler.middleware';
import cookieParser from 'cookie-parser';

// initialisations:
const app = express()
const PORT = process.env.PORT
const mongo_URI = process.env.mongo_URI

// Connecting to mongoDB
connectmongoDB(mongo_URI!)
// testing PostgreSQL connection:
postgresPool.query('SELECT NOW()')
  .then(()=>{
    console.log(`PostgreSQL connected`)
  })
  .catch((err)=>{
    console.error(`Error connecting to PostgreSQL DB:`,err)
  })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// importing routes:
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import socialRoutes from './routes/post.routes'
import feedRoutes from './routes/feed.routes'


// using routes:
app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)
app.use('/api/social',socialRoutes)
app.use('/api/feed',feedRoutes)

app.get("/",(req:Request,res:Response) => {
  res.status(200).json({
   message: `Backend live` 
  })
})

app.get('/{*all}',(req:Request,res:Response)=>{
  res.status(404).json({
    message : `Cannot ${req.method} @ ${req.url}`
  })
})

app.listen(PORT,()=>{
  console.log(`Server: http://localhost:${PORT}`)
})

console.log(`Node version: ${process.version}`);

// using error handler:
app.use(errorHandler)



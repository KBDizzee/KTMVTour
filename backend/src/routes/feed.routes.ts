import { fetchFeed } from "../controllers/feed.controller"
import { authenticate } from "../middlewares/auth.middleware"
import express from "express"


const router = express.Router()

router.get('/home',authenticate(),fetchFeed)


export default router
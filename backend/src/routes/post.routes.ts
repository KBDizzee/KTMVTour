import express from "express";
import { uploader } from "../middlewares/uploader.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { createPost } from "../controllers/posts.controller";

const router = express.Router();
const upload = uploader()

router.post('/postPics',authenticate(),upload.array('photos',10), createPost)


export default router

import express from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { commentOnPost } from '../controllers/comments.controller';

const router = express.Router()

router.post('/comment/:postId',authenticate(),commentOnPost)

export default router
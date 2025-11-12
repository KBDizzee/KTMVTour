import express from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { checkIfLiked, likePost, unlikePost } from '../controllers/likes.controller';

const router = express.Router()

router.post('/:postId/like',authenticate(),likePost)
router.delete('/:postId/unlike',authenticate(),unlikePost)
router.get('/:postId/checkLiked',authenticate(),checkIfLiked)

export default router
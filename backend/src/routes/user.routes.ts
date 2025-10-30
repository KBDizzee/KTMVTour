import { authenticate } from './../middlewares/auth.middleware';
import express from "express"
import { deleteProfile, updateProfile } from "../controllers/user.controller"
import { uploader } from '../middlewares/uploader.middleware';

const router = express.Router()
const upload = uploader()

router.put('/updateProfile',authenticate(), upload.single('profilePicture'),updateProfile)
router.put('/removeProfilePicture',authenticate(),deleteProfile)

export default router
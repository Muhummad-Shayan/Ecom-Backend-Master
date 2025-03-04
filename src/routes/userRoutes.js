import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js'
import { getAllUsers, getUserProfile, updateUserProfile } from '../controllers/userController.js'
import { verifyAdmin } from '../middleware/verifyAdmin.js'

const userRouter = express.Router()

userRouter.get('/profile',verifyToken,getUserProfile)

userRouter.put('/update',verifyToken,updateUserProfile)

userRouter.get('/all',verifyToken,verifyAdmin,getAllUsers)

export default userRouter
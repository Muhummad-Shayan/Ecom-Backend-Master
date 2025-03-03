import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js'
import { getUserProfile, updateUserProfile } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.get('/profile',verifyToken,getUserProfile)
userRouter.put('/update',verifyToken,updateUserProfile)

export default userRouter
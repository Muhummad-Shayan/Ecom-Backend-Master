
import jwt from 'jsonwebtoken'
import config from '../config/envconfig.js'

export const generateToken = (userID,email) =>{
    return jwt.sign({id:userID,email:email},config.AUTH_SECRET,{
        expiresIn: "7d"
    })
}
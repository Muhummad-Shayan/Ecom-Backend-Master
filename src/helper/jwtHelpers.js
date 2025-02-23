
import jwt from 'jsonwebtoken'
import config from '../config/envconfig.js'

export const generateToken = (userID,email,role) =>{
    return jwt.sign({id:userID,email:email,role:role},config.AUTH_SECRET,{
        expiresIn: "7d"
    })
}
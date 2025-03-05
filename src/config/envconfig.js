import server  from './server.js'
import dotenv from 'dotenv'


dotenv.config()

const config = {
    PORT : server.PORT,
    MONGOURI : process.env.MONGODB_URI,
    AUTH_SECRET: process.env.AUTH_SECRET ,
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLIENT_URL : process.env.CLIENT_URL

}

export default config 
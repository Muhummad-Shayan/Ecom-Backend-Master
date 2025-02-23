import dotenv from 'dotenv'
import server  from './server.js'


dotenv.config()

const config = {
    PORT : server.PORT,
    MONGOURI : process.env.MONGODB_URI,
    AUTH_SECRET: process.env.AUTH_SECRET 

}

export default config 
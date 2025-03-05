import express from 'express'
import ConnectDB from './config/DB.js'
import server from './config/server.js'
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoutes.js'
import OrderRouter from './routes/OrderRoutes.js'
import helmet from 'helmet'
import cors from 'cors'
import corsOptions from './config/Cors.js'
import rateLimiter from './middleware/rateLimiter.js'
import morganCustom from './middleware/morganFormat.js'

const app = express()

// Some Security Middlewares

app.use(helmet())

app.use(cors(corsOptions))

app.use(rateLimiter)

app.use(express.json())

// logger

app.use(morganCustom)


//  connect to the database

ConnectDB()

// Routes

app.use('/auth',authRouter)

app.use('/user',userRouter)

app.use('/product',productRouter)

app.use('/order',OrderRouter)




app.listen(server.PORT,()=>{
    console.log(`SERVER RUNNING ON PORT NO ${server.PORT}`);
    
})







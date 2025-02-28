import express from 'express'
import ConnectDB from './config/DB.js'
import server from './config/server.js'
import { authRouter } from './routes/authRoutes.js'
import { userRouter } from './routes/userRoutes.js'
import { productRouter } from './routes/productRoutes.js'


const app = express()
app.use(express.json())

ConnectDB()

app.use('/auth',authRouter)
app.use('/user',userRouter)
app.use('/product',productRouter)



app.listen(server.PORT,()=>{
    console.log(`SERVER RUNNING ON PORT NO ${server.PORT}`);
    
})







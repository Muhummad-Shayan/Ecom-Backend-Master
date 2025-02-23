import express from 'express'
import ConnectDB from './config/DB.js'
import server from './config/server.js'
import { authRouter } from './routes/authRoutes.js'


const app = express()
app.use(express.json())

ConnectDB()

app.use('/auth',authRouter)



app.listen(server.PORT,()=>{
    console.log(`SERVER RUNNING ON PORT NO ${server.PORT}`);
    
})







import express from 'express'
import ConnectDB from './config/DB.js'
import server from './config/server.js'

const app = express()
app.use(express.json())



ConnectDB()

app.listen(server.PORT,()=>{
    console.log(`SERVER RUNNING ON PORT NO ${server.PORT}`);
    
})







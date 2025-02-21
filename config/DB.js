import mongoose from "mongoose"; 
import config from "./envconfig.js";

const ConnectDB = async ()=>{
    try {
        const connect = await mongoose.connect(config.MONGOURI)
        console.log(`MONGODB CONNECTED SUCCESSFULLY ${connect.connection.host}`);
        
    } catch (error) {
        console.log("error in connecting to DB",error);
        
    }
}

export default ConnectDB



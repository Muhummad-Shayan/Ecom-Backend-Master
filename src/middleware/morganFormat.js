import morgan from "morgan";
import logger from "../config/logger.js";

const morganformat = ':method :url :status :response-time ms'

const morganCustom = morgan(morganformat,{
    stream:{
        write:(message) =>{
            const logObject = {
                method : message.split(' ')[0],
                url: message.split(' ')[1],
                status: message.split(' ')[2],
                responseTime: message.split(' ')[3],
            }
            logger.info(logObject);
        }
    }
})


export default morganCustom
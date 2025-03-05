import config from "./envconfig.js";


let corsOptions = {
    origin:  config.CLIENT_URL,
    optionsSuccessStatus : 200
}

export default corsOptions
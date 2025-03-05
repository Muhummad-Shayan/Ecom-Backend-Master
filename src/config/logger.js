import winston from "winston";

const { format,transports } = winston;

const consoleLogFromat = format.combine(
    format.colorize(),
    format.printf((level,message,)=>{
        return `${level}: ${message}`;
    })
)


const logger = winston.createLogger({
    level: "info",
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.json()
    ),

    transports:[
        new transports.Console({
            consoleLogFromat
        }),
        new transports.File({
            filename: "app.log",

        })

    ]

})

export default logger;

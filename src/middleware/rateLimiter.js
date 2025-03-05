import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    limit: 1000 ,
    standardHeaders: 'draft-8',
    legacyHeaders:false
})

export default rateLimiter
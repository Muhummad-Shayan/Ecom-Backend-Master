import Joi from "joi";


const signupSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("user", "admin").default("user"),
    contact: Joi.string().allow("").optional(),
    address: Joi.string().allow("").optional(),
});


const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export { signupSchema, loginSchema };

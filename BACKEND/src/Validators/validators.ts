import Joi from "joi";

export const Notes = Joi.object({
    title: Joi.string().required().min(3).max(30),
    description: Joi.string().required().min(3).max(30),
    content: Joi.string().required().min(150).max(5000),

})
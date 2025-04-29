const Joi = require('joi');

const BookSchema = Joi.object({
     book :Joi.object({
        book_Name: Joi.string().required(),
        author: Joi.string().required(),
        Publish_Date: Joi.number().min(0),
        Image: Joi.object({
            filename: Joi.string(),
            url: Joi.string()
        }),
        price: Joi.number().min(0).required()
    }).required()
})

module.exports = BookSchema;
const Joi = require('joi')

const { name } = require('./customize.validation')

const createCateSchema = {
    body: Joi.object().keys({
        name: Joi.string().required().custom(name),
        imageUrl: Joi.string().required(),
    }),
}


const updateCateSchema = {
    body: Joi.object().keys({
        name: Joi.string().required().custom(name),
        imageUrl: Joi.string().required(),
        
    }),
}

module.exports = {
    createCateSchema,
    updateCateSchema
}
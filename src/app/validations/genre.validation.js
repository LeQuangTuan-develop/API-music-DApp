const Joi = require('joi')
const { imageUrl } = require('./customize.validation')

const checkGenre={
    body:Joi.object().keys({
        name:Joi.string().required(),
        description:Joi.string(),
        imageUrl:Joi.string().custom(imageUrl)
    }),
}

module.exports = {
    checkGenre
}

const Joi = require('joi')

const { name, imageUrl } = require('./customize.validation')

const createSongSchema = {
    body: Joi.object().keys({
        name: Joi.string().trim().required().custom(name),
        lyric: Joi.string().trim().required(),
        lyricRendered: Joi.array().items(
            Joi.object({
                lyricChord:Joi.string().required(),
                lyric: Joi.string().required(),
                chord: Joi.string().required(),
            })
        ),
        musician: Joi.string().trim().required(),
        audioUrl: Joi.string().trim().required(),
        userId: Joi.number().integer().greater(0).required(),
        singer: Joi.string().trim().required(),
        tone: Joi.string().trim().required(),
        thumbnail: Joi.string().trim().required().custom(imageUrl),
        categoryId: Joi.number().integer().greater(0).required(),
        genreId: Joi.number().integer().greater(0).required(),
    }),
}

module.exports = {
    createSongSchema,
}

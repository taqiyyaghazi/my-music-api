const Joi = require('joi');

const SongPayloadSchema = Joi.object({
    title: Joi.string().required(),
    artists: Joi.array()
        .items(
            Joi.object({
                name: Joi.string().required(),
            }).required()
        )
        .required(),
    url: Joi.string().required(),
});

module.exports = { SongPayloadSchema };

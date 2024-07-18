const Joi = require('joi');
const Boom = require('boom');

const searchAnimeValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const getIdAnimeValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().required()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const getFilterAnimeValidation = (data) => {
  const schema = Joi.object({
    genre: Joi.alternatives().try(
      Joi.string(),       // Field can be a string
      Joi.array()        // or an array
    ).required(),
    status: Joi.string().valid('FINISHED', 'ONGOING', 'UPCOMING', 'UNKNOWN').optional(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const getSeasonAnimeValidation = (data) => {
  const schema = Joi.object({
    season: Joi.string().valid('SPRING', 'SUMMER', 'FALLEN', 'WINTER').required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};
const getYearAnimeValidation = (data) => {
  const schema = Joi.object({
    year: Joi.number().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};



module.exports = { searchAnimeValidation, getIdAnimeValidation, getFilterAnimeValidation, getSeasonAnimeValidation, getYearAnimeValidation };

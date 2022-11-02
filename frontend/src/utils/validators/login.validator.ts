import Joi from 'joi';

export const LoginValidator = Joi.object({
  email: Joi.string()
    .regex(
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    )
    .required()
    .label('E-mail')
    .messages({
      'string.empty': 'Field {{#label}} cannot be empty',
      'string.pattern.base': 'Invalid {{#label}} entered',
    }),

  password: Joi.string().min(3).required().label('Password').messages({
    'string.empty': 'Field {{#label}} cannot be empty"',
    'string.min': '{{#label}} cannot be less than 3 characters',
  }),
});

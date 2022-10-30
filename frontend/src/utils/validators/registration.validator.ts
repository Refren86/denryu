import Joi from "joi";

export const RegistrationValidator = Joi.object({
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

  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .label('Username')
    .messages({
      'string.empty': 'Field {{#label}} cannot be empty"',
      'string.min': '{{#label}} must contain at least 3 characters',
      'string.max': '{{#label}} cannot contain more than 30 characters',
    }),

  password: Joi.string().min(3).required().label('Password').messages({
    'string.empty': 'Field {{#label}} cannot be empty"',
    'string.min': '{{#label}} cannot be less than 3 characters',
  }),

  repeatPassword: Joi.any()
    .equal(Joi.ref('password'))
    .required()
    .label('Repeat password')
    .messages({
      'any.only': '{{#label}} does not match',
    }),
});
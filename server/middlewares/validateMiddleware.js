import Joi from 'joi'

import ApiError from '../exceptions/apiError.js'

// Validate Contact
const contactJoiSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } }),
  phone: Joi.string()
    .alphanum()
    .min(3)
    .max(30),
  favorite: Joi.boolean(),
})

const validateContact = (req, res, next) => {
  const { error } = contactJoiSchema.validate(req.body)

  if (error) {
    throw ApiError.BadRequest(error.details[0].message)
  }

  next()
}

// Validate User
const userJoiSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } }),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  subscription: Joi.string()
    .valid("starter", "pro", "business"),
  role: Joi.string()
    .valid("admin", "user"),
  token: [
    Joi.string(),
    Joi.number()
  ],
})

const validateUser = (req, res, next) => {
  const { error } = userJoiSchema.validate(req.body)

  if (error) {
    throw ApiError.BadRequest(error.details[0].message)
  }

  next()
}

// Validate ID
const validateId = (req, res, next) => {
  const { id } = req.params
  // const objId = /^[0-9a-fA-F]{24}$/
  const objId = new RegExp(/^[0-9a-fA-F]{24}$/)

  if (!id.match(objId)) {
    return res
      .status(400)
      .json({
        status: 'Bad request',
        code: 400,
        message: `Not valid contact id ${id}`,
      })
  }

  next()
}

export { validateContact, validateUser, validateId }
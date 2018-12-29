'use strict'

const HttpError = require('../http-error.js')

/**
 * @return {Function} Middleware.
 */
const factory = () => {
  return (req, res, next) => {
    return next(new HttpError.NotFound('requested resource was not found'))
  }
}

module.exports = { factory }

'use strict'

const HttpError = require('../http-error.js')

/**
 * @return {Function} Middleware.
 */
const factory = () => {
  return (err, req, res, next) => {
    if (err instanceof HttpError) {
      return next(err)
    }

    return next(new HttpError.InternalError(err.message, err.stack))
  }
}

module.exports = { factory }

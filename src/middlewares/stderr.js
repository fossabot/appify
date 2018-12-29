'use strict'

const HttpError = require('../http-error.js')

/**
 * @return {Function} Middleware.
 */
const factory = (logger) => (err, req, res, next) => {
  if (!(err instanceof HttpError)) {
    logger.error(err)
  }

  return next(err)
}

module.exports = { factory }

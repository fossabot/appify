'use strict'

const Sentry = require('@sentry/node')
const HttpError = require('../http-error.js')

/**
 * @return {Function} Middleware.
 */
const factory = () => (err, req, res, next) => {
  if (err instanceof HttpError) {
    return next(err)
  }

  return Sentry.Handlers.errorHandler()(err, req, res, next)
}

module.exports = { factory }

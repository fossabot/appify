'use strict'

const Sentry = require('@sentry/node')

/**
 * @return {Function} Middleware.
 */
const factory = () => (req, res, next) => {
  return Sentry.Handlers.requestHandler()(req, res, next)
}

module.exports = { factory }

'use strict'

const Sentry = require('@sentry/node')
const { TEST } = require('sugar-env')

const unhandledRejection = function unhandledRejectionHook (environment, logger) {
  if (environment === TEST) {
    return
  }

  process.on('unhandledRejection', (err) => {
    logger.error('Unhandled Rejection:', err)

    const client = Sentry
      .getCurrentHub()
      .getClient()

    if (!client) {
      process.exit(1)
    }

    Sentry.captureException(err)

    client
      .close(3000)
      .then(() => { process.exit(1) })
  })
}

module.exports = { unhandledRejection }

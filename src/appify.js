'use strict'

const configify = require('./configify.js')
const debug = require('debug')('appify:factory')
const express = require('express')
const hooks = require('./hooks.js')
const middlewares = require('./middlewares.js')
const Sentry = require('@sentry/node')

/**
 * @param   {Function} fn Custom application factory function.
 * @returns {Function}    HTTP application factory function.
 */
module.exports = function appify (fn) {
  return async function factory (options, environment, logger = console) {
    const config = configify.app(options, environment)

    config.has('sentry.dsn')
      ? Sentry.init(config.sentry)
      : debug('missing sentry dsn, its initialization has been skipped')

    hooks.unhandledRejection(environment, logger)

    //

    const app = express()

    app.use(middlewares.sentry.requests.factory())
    app.use(middlewares.morgan.factory(config.morgan))
    app.use(middlewares.parsers.urlencoded.factory())
    app.use(middlewares.parsers.json.factory())
    app.use(middlewares.helmet.factory())

    await fn(app, config, environment, logger)

    app.get('/ping', (req, res) => {
      res
        .type('txt')
        .end('Pong!')
    })

    app.use('*', middlewares.unmatched.factory())
    app.use(middlewares.sentry.errors.factory())
    app.use(middlewares.stderr.factory(logger))
    app.use(middlewares.normalizer.factory())
    app.use(middlewares.renderer.factory())

    return app
  }
}

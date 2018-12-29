'use strict'

const configify = require('./configify.js')
const debug = require('debug')('appify:server')
const env = require('sugar-env')
const spdy = require('spdy')

const spdyOptions = ({ server: { spdy: { key, cert, ...spdy } } }) => {
  return { key, cert, spdy }
}

/**
 * @param   {Function}  app     App facotry.
 * @param   {Object}    options Config object.
 * @returns {void}
 */
const start = async (app, options) => {
  const logger = console
  const config = configify.server(options)

  return app(config, env.current, logger).then((app) => {
    const server = spdy.createServer(spdyOptions(config), app)

    const bind = config.has('binding.socket')
      ? `pipe ${config.server.binding.socket}`
      : `http://${config.server.binding.ip}:${config.server.binding.port}/`

    const onListening = (err) => {
      if (err) {
        logger.error(err)
        process.exit(1)
      }

      debug(`Listening on ${bind}`)
    }

    return config.server.binding.socket
      ? server.listen(config.server.binding.socket, onListening)
      : server.listen(config.server.binding.port, config.server.binding.ip, onListening)
  })
}

module.exports = { start }

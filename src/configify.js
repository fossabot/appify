'use strict'

const _defaults = require('lodash.defaultsdeep')
const _get = require('lodash.get')
const _has = require('lodash.has')
const env = require('sugar-env')
const { format } = require('util')

/**
 * @param   {Object} options  Override vsalues.
 * @param   {Object} defaults Overriteable default values.
 * @returns {Object}
 */
const configify = function configify (options, defaults) {
  const config = _defaults(options, defaults)

  const empty = (value) => {
    return [undefined, null].includes(value)
  }

  return {
    ...config,
    has (path) {
      return _has(this, path) && !empty(_get(this, path))
    },
    get (path, defaultValue = null) {
      const value = _get(this, path, defaultValue)

      return !empty(value)
        ? value
        : defaultValue
    }
  }
}

/**
 * @param   {Object} options      Override values.
 * @param   {Object} environment  Current environment name.
 * @returns {Object}
 */
configify.app = function app (options, environment) {
  const name = env.get(['APPIFY_APP_NAME', 'npm_package_name'], 'app')

  return configify(options, {
    app: {
      name,
      version: env.get(['APPIFY_APP_VERSION', 'GIT_RELEASE'])
    },
    morgan: {
      format: env.get('APPIFY_MORGAN_FORMAT', ':method :url :status :: :response-time ms'),
      skip: () => environment !== env.DEVELOPMENT
    },
    sentry: {
      environment,
      attachStacktrace: true,
      dsn: env.get(['APPIFY_SENTRY_DSN', 'SENTRY_DSN']),
      tags: {
        relese: env.get(['APPIFY_SENTRY_TAGS_RELEASE', 'GIT_RELEASE']),
        commit: env.get(['APPIFY_SENTRY_TAGS_COMMIT', 'GIT_COMMIT'])
      },
      beforeSend: (event) => environment !== env.DEVELOPMENT ? event : null,
      release: format('%s@%s', name, env.get(['APPIFY_SENTRY_RELEASE', 'GIT_RELEASE']))
    }
  })
}

configify.server = function server (options) {
  return configify(options, {
    server: {
      binding: {
        socket: env.get('APPIFY_SERVER_BINDING_SOCKET'),
        ip: env.get('APPIFY_SERVER_BINDING_IP', '0.0.0.0'),
        port: env.get.int('APPIFY_SERVER_BINDING_PORT', 3000)
      },
      spdy: {
        protocols: [ 'h2', 'spdy/3.1', 'http/1.1' ],
        'x-forwarded-for': env.get.boolean('APPIFY_SERVER_SPDY_X_FORWARDED_FOR', true),
        plain: env.get.boolean('APPIFY_SERVER_SPDY_PLAIN', true),
        ssl: env.get.boolean('APPIFY_SERVER_SPDY_SSL', false),
        key: env.get.base64('APPIFY_SERVER_SSL_KEY', undefined),
        cert: env.get.base64('APPIFY_SERVER_SSL_CERT', undefined)
      }
    }
  })
}

module.exports = configify

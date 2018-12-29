'use strict'

const debug = require('debug')('appify:request')
const morgan = require('morgan')

/**
 * @params {String}   options.format  Log format.
 * @return {Function}                 Middleware.
 */
const factory = ({ format, skip }) => {
  const stream = {
    write: (string) => { debug(string.replace(/\n/, '')) }
  }

  return morgan(format, { skip, stream })
}

module.exports = { factory }

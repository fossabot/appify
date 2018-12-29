'use strict'

const helmet = require('helmet')

/**
 * @return {Function} Middleware.
 */
const factory = () => {
  return helmet()
}

module.exports = { factory }

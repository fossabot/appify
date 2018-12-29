'use strict'

const { json } = require('body-parser')

/**
 * @return {Function} Middleware.
 */
const factory = () => {
  return json()
}

module.exports = { factory }

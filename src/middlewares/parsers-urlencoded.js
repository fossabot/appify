'use strict'

const { urlencoded } = require('body-parser')

/**
 * @return {Function} Middleware.
 */
const factory = () => {
  return urlencoded({ extended: true })
}

module.exports = { factory }

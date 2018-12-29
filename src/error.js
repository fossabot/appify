'use strict'

module.exports = class extends Error {
  /**
   * @param {string} message
   * @param {string} stack
   */
  constructor (message, stack) {
    super(message)

    if (stack) {
      this.stack = this.stack
    }

    this.name = this.constructor.name
  }
}

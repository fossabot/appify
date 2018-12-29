'use strict'

const Error = require('./error.js')

class HttpError extends Error {
  /**
   * @params  {Number}  status  HTTP status code.
   * @params  {String}  code    Custom error code.
   * @params  {String}  message Error message.
   * @params  {String}  stack   Error stack.
   */
  constructor (status, code, message, stack) {
    super(message, stack)

    this.code = code
    this.status = status
  }
}

class ConflictHttpError extends HttpError {
  /**
   * @params  {String}  message Error message.
   * @params  {String}  code    Error code.
   */
  constructor (message, code = 'conflict') {
    super(409, code, message)
  }
}

class ForbiddenHttpError extends HttpError {
  /**
   * @params  {String}  message Error message.
   * @params  {String}  code    Error code.
   */
  constructor (message, code = 'forbidden') {
    super(403, code, message)
  }
}

class InternalErrorHttpError extends HttpError {
  /**
   * @params  {String}  message Error message.
   * @params  {String}  stack   Error stack.
   */
  constructor (message, stack) {
    super(500, 'internal_error', message, stack)
  }
}

class LockedHttpError extends HttpError {
  /**
   * @params  {String}  message Error message.
   * @params  {String}  code    Error code.
   */
  constructor (message, code = 'locked') {
    super(423, code, message)
  }
}

class NotFoundHttpError extends HttpError {
  /**
   * @params  {String}  message Error message.
   * @params  {String}  code    Error code.
   */
  constructor (message, code = 'not_found') {
    super(404, code, message)
  }
}

class ServiceUnavailableHttpError extends HttpError {
  /**
   * @params  {String}  message Error message.
   * @params  {String}  code    Error code.
   */
  constructor (message, code = 'service_unavailable') {
    super(503, code, message)
  }
}

class UnauthorizedHttpError extends HttpError {
  /**
   * @params  {String}  message Error message.
   * @params  {String}  code    Error code.
   */
  constructor (message, code = 'unauthorized') {
    super(401, code, message)
  }
}

class UnprocessableEntityHttpError extends HttpError {
  /**
   * @params  {String} message Error message.
   * @params  {String}  code    Error code.
   */
  constructor (message, code = 'unprocessable_entity') {
    super(422, code, message)

    this.__details = []
  }

  /**
   * @return {Array<Object>}  Array of details.
   */
  get details () {
    return this.__details
  }

  /**
   * @params  {Array<Object>}                 Array of details.
   * @return  {UnprocessableEntityHttpError}  Self instance.
   */
  with (details) {
    this.__details = details

    return this
  }
}

module.exports = HttpError
module.exports.Locked = LockedHttpError
module.exports.Conflict = ConflictHttpError
module.exports.NotFound = NotFoundHttpError
module.exports.Forbidden = ForbiddenHttpError
module.exports.Unauthorized = UnauthorizedHttpError
module.exports.InternalError = InternalErrorHttpError
module.exports.ServiceUnavailable = ServiceUnavailableHttpError
module.exports.UnprocessableEntity = UnprocessableEntityHttpError

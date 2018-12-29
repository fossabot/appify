'use strict'

const HttpError = require('../http-error.js')

/**
 * @params  {Error} err Instance of error.
 * @return  {Boolean}   Whether validation details should be displayed.
 */
const shouldDisplayValidationDetails = (err) => {
  return err instanceof HttpError.UnprocessableEntity && err.details.length > 0
}

/**
 * @params  {String}  environment Current environment name.
 * @return  {Boolean}             Whether error stack should be displayed.
 */
const shouldDisplayErrorStack = (environment) => {
  return environment !== 'production'
}

/**
 * @params {Error}    err         Instance of error.
 * @params {String}   environment Current environment name.
 * @return {Boolean}              Whether an generic error message should be displayed.
 */
const shouldDisplayGenericMessage = (err, environment) => {
  if (environment !== 'production') {
    return false
  }

  if (!(err instanceof HttpError.InternalError)) {
    return false
  }

  return true
}

/**
 * @params {String}   environment Current environment name.
 * @return {Function}             Middleware.
 */
const factory = (environment) => {
  return (err, req, res, next) => {
    const { code, status } = err

    const message = shouldDisplayGenericMessage(err, environment)
      ? 'oh no! something went wrong on our end'
      : err.message

    const details = shouldDisplayValidationDetails(err)
      ? err.details
      : undefined

    const stack = shouldDisplayErrorStack(environment)
      ? err.stack
      : undefined

    res
      .status(status)
      .json({ status, error: { code, message, details, stack } })
  }
}

module.exports = { factory }

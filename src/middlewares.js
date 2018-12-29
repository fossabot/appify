'use strict'

module.exports = {
  helmet: require('./middlewares/helmet.js'),
  morgan: require('./middlewares/morgan.js'),
  normalizer: require('./middlewares/normalizer.js'),
  parsers: {
    json: require('./middlewares/parsers-json.js'),
    urlencoded: require('./middlewares/parsers-urlencoded.js')
  },
  sentry: {
    errors: require('./middlewares/sentry-errors.js'),
    requests: require('./middlewares/sentry-requests.js')
  },
  renderer: require('./middlewares/renderer.js'),
  stderr: require('./middlewares/stderr.js'),
  unmatched: require('./middlewares/unmatched.js')
}

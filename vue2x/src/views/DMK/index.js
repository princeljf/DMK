if (process.env.NODE_ENV === 'production') {
    module.exports = require('./dist/DMK.js')
  } else {
    module.exports = require('./dist/DMK.js')
}
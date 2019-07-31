if (process.env.NODE_ENV === 'production') {
    module.exports = require('./dist/dataMapsKeysMixins.js')
  } else {
    module.exports = require('./lib/dataMapsKeysMixins.js')
}
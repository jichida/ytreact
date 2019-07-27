if (process.env.NODE_ENV === 'production') {
    module.exports = require('./scanbarcode.dev');
} else {
    module.exports = require('./scanbarcode.dev');
}

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./scanbarcode.prod');
} else {
    module.exports = require('./scanbarcode.dev');
}

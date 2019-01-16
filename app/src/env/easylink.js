if (process.env.NODE_ENV === 'production') {
    module.exports = require('./easylink.prod');
} else {
    module.exports = require('./easylink.dev');
}

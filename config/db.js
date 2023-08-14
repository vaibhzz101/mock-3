const mongoose = require('');
const connection = mongoose.connect(process.env.mongoURL);

module.exports = {
    connection
}
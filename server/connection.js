const mongoose = require('mongoose');

const conn = mongoose.createConnection(process.env.MONGO_CONN);

module.exports = conn;
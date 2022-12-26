const mongoose = require('mongoose');
const db = require('../connection');
const usersSchema = new mongoose.Schema({ username: String, email : String, role : [String], password : String });
module.exports = db.model('users', usersSchema);

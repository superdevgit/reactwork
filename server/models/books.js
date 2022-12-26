const mongoose = require('mongoose');
const db = require('../connection');
const booksSchema = new mongoose.Schema({ name: String, author : String, user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }}, { timestamps: true });
module.exports = db.model('books', booksSchema);

const Books = require('../models/books');
const { check, validationResult } = require('express-validator');

exports.books = async function (req, res, next) {
    let user = res.locals.user
    await check('name', "Book name is required!").notEmpty().run(req);
    await check('author', 'Author name is required!').notEmpty().run(req);
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array(), message: 'Could not create book!' });
    }

    await Books.create({ name: req.body.name, author: req.body.author, user_id: user.id });
    return res.status(200).json({ res: res.locals.user, success: true });
}

exports.findBooks = async function (req, res) {
    let old = req.query.old;
    let _new = req.query.new;
    let resData
    let user = res.locals.user
    let query = {}
    if (old != undefined) {
        query.createdAt = { $lte: new Date().getTime() - (1000 * 60 * 10) };
    } else if (_new != undefined) {
        query.createdAt = { $gte: new Date().getTime() - (1000 * 60 * 10) };
    }

    if (!user.role.includes('VIEW_ALL')) {
        query.user_id = user.id;
    }
    resData = await Books.find(query);
    return res.status(200).json({ "res": "ok", resData: resData, userData: user });
}

exports.deleteBook = async function (req, res) {
    var resData = await Books.findByIdAndDelete(req.params.id);
    return res.status(200).json({ resData });
}

exports.updateBook = async function (req, res) {
    await check('name', "Book name is required!").notEmpty().run(req);
    await check('author', 'Author name is required!').notEmpty().run(req);
    // await check('id', 'Book Id is required!').notEmpty().run(req);
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array(), message: 'Could not update book!' });
    }

    let book = await Books.findById(req.body.id);
    if (book) {
        book.name = req.body.name;
        book.author = req.body.author;
        await book.save();
        return res.status(200).json({ "res": "ok" });
    } else {
        return res.status(422).json({ "res": "Book not found!" });
    }
}

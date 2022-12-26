const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const db = require('../connection');
const usersSchema = new mongoose.Schema({ username: String, email: String, role: String, password: String });
const Users = require('../models/users');
require('dotenv').config();

exports.register = async function (req, res) {
    await check('username', "Name is required").notEmpty().run(req);
    await check('password', "Password is required").notEmpty().run(req);
    await check('email', 'Invalid email').isEmail().notEmpty().run(req);
    await check('role').notEmpty().run(req);

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array(), message: 'Could not register' })
    }

    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let role = req.body.role;

    password = generatePassword(password);

    let resp = await Users.create({ username: username, email: email, role: role, password: password });

    if (resp) return res.status(200).json({ "success": true });

    return res.status(200).json({ "success": false });
};

exports.login = async function (req, res) {
    await check('password', "Password is required").notEmpty().run(req);
    await check('email', 'Invalid email').isEmail().notEmpty().run(req);

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array(), message: 'Could not login!' });
    }

    let email = req.body.email;
    let password = req.body.password;

    let user = await Users.findOne({ email: email });
    if (user && password == null || false == bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ success: false, errors: "The password that you have entered is incorrect!", incorrectPwd: true });
    }else if(user==null){
        return res.status(400).json({ success: false, errors: "Email is not exists!"});
    }

    let payload = { id: user._id, email: user.email, role: user.role };
    let options = { expiresIn: process.env.JWT_EXPIRES, algorithm: 'HS256', issuer: process.env.JWT_ISSUER };
    let secret = process.env.JWT_SECRET;

    let token = jwt.sign(payload, secret, options);
    let _user = { user: payload }

    if (user) return res.status(200).json({ "success": true, _user, token: token });

    return res.status(400).json({ "success": false });
};

function generatePassword(pwd) {
    const saltRounds = 1;
    const salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(pwd, saltRounds);
    return hash;
}
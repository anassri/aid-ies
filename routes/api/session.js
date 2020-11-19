const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const { getUserToken, authenticated } = require('./auth');
const bcrypt = require('bcryptjs');

const { User } = require('../../db/models');

const router = express.Router();

const email =
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail();
        
const password =
    check('password')
        .not().isEmpty()
        .withMessage('Please provide a password');

router.put('/', email, password, asyncHandler(async function (req, res, next) {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map((err) => err.msg);
        res.status(400).json(errors);
    }
    const { email, password } = req.body;
    const user = await User.findOne({
        where: { email },
    });
    const validatePassword = bcrypt.compareSync(password, user.hashedPassword.toString());
    
    if( !user || !validatePassword) {
        const err = new Error("Login failed");
        err.status = 401;
        err.title = "Login failed";
        err.errors = ["The provided email and password were invalid, please try again."];
        res.status(400).json(err.errors);
    }
    
    const token  = getUserToken(user);
    res.cookie('aidies/authentication/token', token);
    res.json({ user: user.toSafeObject() });
     
}));


router.delete('/', asyncHandler(async (req, res) => {
    res.clearCookie('aidies/authentication/token');
    res.json({ message: 'success' });
}));


module.exports = router;

const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const { getUserToken, authenticated } = require('./auth');
const bcrypt = require('bcryptjs');

const { User } = require('../../db/models');

const router = express.Router();

const userValidation =[
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('Please Provide a first name')
        .isLength({ max: 20 })
        .withMessage('First Name must not be more than 50 characters'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Please Provide a last name')
        .isLength({ max: 20 })
        .withMessage('last Name must not be more than 50 characters'),
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please Provide an email')
        .isLength({ max: 50 })
        .withMessage('email must not be more than 255 characters')
        .isEmail()
        .withMessage('Email address is not a valid email')
        .custom((value) => {
            return User.findOne({ where: { email: value } })
                .then((user) => {
                    if (user) {
                        return Promise.reject('Email already in use')
                    }
                })
        }),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password')
        .isLength({ max: 50 })
        .withMessage('Password must not be longer than 50 characters')/* 
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
        .withMessage('Password must contain at least one upper case letter, one lower case letter, one number, one character') */,
    check('confirmPassword')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a confirm password')
        .isLength({ max: 50 })
        .withMessage('Confirm password must not be longer than 50 characters')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password must match');
            }
            return true;
        }),
    check('bio')
        .exists({ checkFalsy: true })
        .withMessage('Please Provide a bio')
];
   
router.post('/', userValidation, asyncHandler(async function (req, res, next) {
    
    const { firstName, lastName, email, password, bio, location, website, instagram, facebook } = req.body;
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map((err) => err.msg);
        res.status(400).json(errors);
        
    } else {
        const hashedPassword = await bcrypt.hashSync(password, 10);
        const user = await User.create({ firstName, lastName, email, hashedPassword, bio, location, website, instagram, facebook });
        const { jti, token } = getUserToken(user);
        res.cookie('aidies/authentication/token', token);
        res.status(201).json({ user: user.toSafeObject() });
    }
}));

module.exports = router;

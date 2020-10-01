const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const { getUserToken, authenticated } = require('./auth');
const bcrypt = require('bcryptjs');

const { Campaign, User, Charity, Category, Bid } = require('../../db/models');
const user = require('../../db/models/user');

const router = express.Router();


router.get('/', asyncHandler(async function (_req, res) {
    const campaigns = await Campaign.findAll({
        include: [{
            model: User,
            attributes: ["firstName", "lastName", "location"]
        },
        {
            model: Charity,
            attributes: ["name"]
        },
        {
            model: Category,
            attributes: ["name"]
        },
        {
            model: Bid,
            attributes: ["userId", "bid"]    
        }]
    });
    res.json(campaigns);
}));
module.exports = router;

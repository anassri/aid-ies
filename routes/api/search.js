const express = require('express');
const asyncHandler = require('express-async-handler');
const { getUserToken, authenticated } = require('./auth');
const {Op} = require('sequelize');

const { Campaign, User, Charity, Category, Bid } = require('../../db/models');

const router = express.Router();

router.get('/:value', asyncHandler(async (req, res) => {
    const campaigns = await Campaign.findAll({
        where: {
            'name': { [Op.like]: '%' + req.params.value + '%' }
        },
        include: [{
            model: User,
            attributes: ["firstName", "lastName", "location"]
        },
        {
            model: Charity,
            attributes: ["name", "bio", "website"]
        },
        {
            model: Category,
            attributes: ["name"]
        },
        {
            model: Bid,
            attributes: ["userId", "bid"],
            include: [{ model: User, attributes: ["firstName", "lastName"] }]
        }],
        
    });
    
    res.json(campaigns);

}))

module.exports = router;
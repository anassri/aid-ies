const express = require('express');
const asyncHandler = require('express-async-handler');
const { getUserToken, authenticated } = require('./auth');

const { Campaign, User, Charity, Category, Bid, Favorite } = require('../../db/models');

const router = express.Router();

router.get('/:id', asyncHandler(async (req, res) => {
    const campaigns = await Campaign.findAll({
        where: {
            userId: parseInt(req.params.id)
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
router.get('/:id/bids', asyncHandler(async (req, res) => {
    const bids = await Bid.findAll({
        where: {
            userId: parseInt(req.params.id)
        },
        include: [{
            model: Campaign,
            attributes: ["name"],
            include: [{
                model: Charity,
                attributes: ["name"]

            }]
        }],
        order: [["createdAt", "DESC"]]
    });
    res.json(bids);

}))
router.get('/:id/favorites', asyncHandler(async (req, res) => {
    console.log(parseInt(req.params.id))
    const favorites = await Campaign.findAll({
        include: {
            model: User,
            as: 'items'
        }
    });
    res.json(favorites);

}))
    
module.exports = router;
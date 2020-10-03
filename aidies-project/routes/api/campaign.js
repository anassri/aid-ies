const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const { getUserToken, authenticated } = require('./auth');
const bcrypt = require('bcryptjs');

const { Campaign, User, Charity, Category, Bid } = require('../../db/models');
const user = require('../../db/models/user');

const router = express.Router();


router.get('/', asyncHandler(async (_req, res) => {
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
        }],
        order: [["id", "ASC"]] 
        
    })
    res.json(campaigns);
}));
const getCampaignById = async (id) => {
    const campaign = await Campaign.findByPk(id, {
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
            attributes: ["userId", "bid"],
            include: [{ model: User, attributes: ["firstName", "lastName"]}]
        }],
    });
    return campaign;
}
router.get('/:id', asyncHandler(async (req, res) => {
    const campaign = await getCampaignById(parseInt(req.params.id))
    res.json(campaign);
    
}))
router.post('/:id/bid', asyncHandler(async (req, res) => {
    const { value,userId } = req.body;
    await Bid.create({campaignId: parseInt(req.params.id), userId, bid: value.toString()})
    const campaign = await getCampaignById(parseInt(req.params.id))
    res.json(campaign);
    
}))
module.exports = router;

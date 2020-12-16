const express = require('express');
const asyncHandler = require('express-async-handler');
const { getUserToken, authenticated } = require('./auth');
const { validationResult } = require('express-validator');

const { Campaign } = require('../../db/models');


const router = express.Router();


router.post('/', asyncHandler(async (req, res) => {
    const { campaignName, summary, story, startingPrice, closingDate, userId, charity, category } = req.body;
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map((err) => err.msg);
        res.status(400).json(errors);

    } else { 
        const newCampaign = await Campaign.create({ 
                                                   name: campaignName, 
                                                   summary, 
                                                   image: "/images/placeholder.png", 
                                                   story, 
                                                   startingPrice, 
                                                   closingDate: new Date(closingDate), 
                                                   userId, 
                                                   charityId: parseInt(charity), 
                                                   categoryId: parseInt(category) })
        res.status(201).json(newCampaign);
     }

}))
module.exports = router;


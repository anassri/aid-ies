const express = require('express');
const asyncHandler = require('express-async-handler');
const { getUserToken, authenticated } = require('./auth');

const { Campaign, User, Charity, Category, Bid } = require('../../db/models');


const router = express.Router();


router.get('/', asyncHandler(async (_req, res) => {
    const campaigns = await Campaign.findAll({
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
            attributes: ["userId", "bid"]    
        }],
        order: [["closingDate", "ASC"]] 
        
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
            attributes: ["name", "bio", "website"]
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
router.delete('/:id/delete', asyncHandler(async (req, res) => {
    const campaign = await getCampaignById(parseInt(req.params.id))
    campaign.destroy();
    res.json(campaign);
    
}))
router.put('/:id/edit', asyncHandler(async (req, res) => {
    const { campaignName, summary, story, startingPrice, closingDate, userId, charity, category } = req.body;
    const campaign = await Campaign.findByPk(parseInt(req.params.id));
    campaign.name = campaignName;
    campaign.summary = summary;
    campaign.story = story;
    campaign.startingPrice = startingPrice;
    campaign.closingDate = new Date(closingDate);
    campaign.charityId = charity;
    campaign.categoryId = category;

    await campaign.save();
    console.log('saved');
    res.json(campaign);
    
}))

module.exports = router;

const express = require('express');
const asyncHandler = require('express-async-handler');
const { getUserToken, authenticated } = require('./auth');

const { Charity} = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const charities = await Charity.findAll();
    res.json(charities);

}))

module.exports = router;
const express = require('express');
const URL = require('../models/url');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const recentUrls = await URL.find({})
            .sort({ createdAt: -1 })
            .limit(5)
            .select('shortId redirectUrl visitHistory createdAt');

        // ✅ PASS baseUrl TO TEMPLATE
        res.render('home', {
            urls: recentUrls || [],
            baseUrl: `http://localhost:8002`
        });
    } catch (error) {
        res.render('home', {
            urls: [],
            baseUrl: `http://localhost:8002`
        });
    }
});

module.exports = router;

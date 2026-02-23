const express = require("express");
const { handleGenerateNewShortUrl, handleGetAnalytics } = require("../controller/url");
const router = express.Router();

router.post("/shorten", handleGenerateNewShortUrl);

router.get("/:shortId/analytics", handleGetAnalytics);

module.exports = router;

const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;
  if (!body?.url) {
    return res.status(400).json({ error: "url is required" });
  }

  const shortID = shortid.generate();

  try {
    await URL.create({
      shortId: shortID,
      redirectUrl: body.url,
      visitHistory: [],
    });

    return res.json({ id: shortID });
  } catch (err) {
    console.error("Error creating URL:", err);
    return res.status(500).json({ error: "DB create failed" });
  }
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  if (!result) {
    return res.status(404).json({ error: "URL not found" });
  }

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
    originalUrl: result.redirectUrl,
    shortId: result.shortId
  });
}

async function handleRedirect(req, res) {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { new: true }
    );
    if (!entry) return res.status(404).json({ error: 'Short URL not found' });
    res.redirect(entry.redirectUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {
  handleGenerateNewShortUrl,
  handleGetAnalytics,
  handleRedirect,
};

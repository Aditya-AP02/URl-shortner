const mongoose = require('mongoose');

// ✅ SAFE MODEL - Won't overwrite
const URLSchema = new mongoose.Schema({
    shortId: { type: String, required: true, unique: true },
    redirectUrl: { type: String, required: true },
    visitHistory: [{ timestamp: { type: Number } }],
    qrCode: String,
}, { timestamps: true });

// ✅ CHECKS if model exists before creating
const URL = mongoose.models.URL || mongoose.model('URL', URLSchema);

module.exports = URL;

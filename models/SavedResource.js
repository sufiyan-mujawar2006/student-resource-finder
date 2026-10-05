const mongoose = require("mongoose");

const savedResourceSchema = new mongoose.Schema({
    title: String,
    link: String,
    snippet: String,
    source: String,
    category: String,
    image: String,
    savedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("SavedResource", savedResourceSchema);
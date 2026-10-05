const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
    query: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    title: String,
    link: String,
    snippet: String,
    source: String,
    image: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Resource", resourceSchema);
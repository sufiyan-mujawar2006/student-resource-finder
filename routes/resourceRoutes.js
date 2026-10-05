const express = require("express");
const router = express.Router();

const SavedResource = require("../models/SavedResource");

router.post("/save", async (req, res) => {
    try {
        const {
            title,
            link,
            snippet,
            source,
            category,
            image
        } = req.body;

        const existing = await SavedResource.findOne({ link });

        if (existing) {
            return res.json({
                message: "Resource already saved.",
                resource: existing
            });
        }

        const resource = await SavedResource.create({
            title,
            link,
            snippet,
            source,
            category,
            image
        });

        res.json({
            message: "Resource saved successfully.",
            resource
        });

    } catch (error) {
        res.status(500).json({
            message: "Could not save resource."
        });
    }
});

router.get("/saved", async (req, res) => {
    try {
        const resources = await SavedResource.find()
            .sort({ savedAt: -1 });

        res.json(resources);
    } catch (error) {
        res.status(500).json({
            message: "Could not load saved resources."
        });
    }
});

router.delete("/saved/:id", async (req, res) => {
    try {
        await SavedResource.findByIdAndDelete(req.params.id);

        res.json({
            message: "Resource removed."
        });
    } catch (error) {
        res.status(500).json({
            message: "Could not remove resource."
        });
    }
});

module.exports = router;
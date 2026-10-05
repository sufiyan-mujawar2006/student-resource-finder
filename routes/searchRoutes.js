const express = require("express");
const router = express.Router();

const Search = require("../models/Search");
const Resource = require("../models/Resource");

const {
    searchSerpAPI,
    formatResults
} = require("../services/serpApiService");

const categories = [
    "Tutorials",
    "Documentation",
    "GitHub",
    "Videos",
    "Courses",
    "Practice"
];

router.get("/", async (req, res) => {
    try {
        const query = (req.query.q || "").trim();
        const category = req.query.category || "All";

        if (!query) {
            return res.status(400).json({
                message: "Please enter a search topic."
            });
        }

        await Search.create({
            query,
            category
        });

        let results = [];

        if (category === "All") {
            const allCached = await Resource.find({
                query: query.toLowerCase()
            });

            if (allCached.length >= 5) {
                results = allCached;
            } else {
                const allResults = [];

                for (const currentCategory of categories) {
                    const cached = await Resource.find({
                        query: query.toLowerCase(),
                        category: currentCategory
                    });

                    if (cached.length > 0) {
                        allResults.push(...cached);
                        continue;
                    }

                    try {
                        const serpResults = await searchSerpAPI(
                            query,
                            currentCategory
                        );

                        const formatted = formatResults(
                            serpResults,
                            query,
                            currentCategory
                        );

                        const documents = formatted.map(item => ({
                            query: query.toLowerCase(),
                            category: currentCategory,
                            title: item.title,
                            link: item.link,
                            snippet: item.snippet,
                            source: item.source,
                            image: item.image
                        }));

                        if (documents.length > 0) {
                            await Resource.insertMany(documents);
                            allResults.push(...documents);
                        }
                    } catch (error) {
                        console.log(
                            `${currentCategory} search failed:`,
                            error.message
                        );
                    }
                }

                results = allResults;
            }
        } else {
            const cached = await Resource.find({
                query: query.toLowerCase(),
                category
            });

            if (cached.length > 0) {
                results = cached;
            } else {
                const serpResults = await searchSerpAPI(
                    query,
                    category
                );

                const formatted = formatResults(
                    serpResults,
                    query,
                    category
                );

                const documents = formatted.map(item => ({
                    query: query.toLowerCase(),
                    category,
                    title: item.title,
                    link: item.link,
                    snippet: item.snippet,
                    source: item.source,
                    image: item.image
                }));

                if (documents.length > 0) {
                    await Resource.insertMany(documents);
                }

                results = documents;
            }
        }

        res.json({
            query,
            category,
            total: results.length,
            results
        });

    } catch (error) {
        console.log("Search error:", error.message);

        res.status(500).json({
            message: "Search failed.",
            error: error.message
        });
    }
});

router.get("/history", async (req, res) => {
    try {
        const history = await Search.find()
            .sort({ createdAt: -1 })
            .limit(10);

        res.json(history);
    } catch (error) {
        res.status(500).json({
            message: "Could not load search history."
        });
    }
});

router.get("/learning-path", async (req, res) => {
    try {
        const query = (req.query.q || "").trim();

        if (!query) {
            return res.status(400).json({
                message: "Topic is required."
            });
        }

        const path = [];

        const steps = [
            {
                category: "Tutorials",
                title: "1. Start with a Tutorial",
                description: "Learn the basic concepts first."
            },
            {
                category: "Documentation",
                title: "2. Read Documentation",
                description: "Understand the official concepts and features."
            },
            {
                category: "Practice",
                title: "3. Practice",
                description: "Solve questions and exercises."
            },
            {
                category: "GitHub",
                title: "4. Explore GitHub Projects",
                description: "See how other developers use the technology."
            },
            {
                category: "Courses",
                title: "5. Go Deeper",
                description: "Use a complete course for advanced learning."
            }
        ];

        for (const step of steps) {
            const resource = await Resource.findOne({
                query: query.toLowerCase(),
                category: step.category
            });

            path.push({
                ...step,
                resource: resource || null
            });
        }

        res.json({
            query,
            path
        });

    } catch (error) {
        res.status(500).json({
            message: "Could not create learning path."
        });
    }
});

module.exports = router;
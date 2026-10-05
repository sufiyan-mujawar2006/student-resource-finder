const { getJson } = require("serpapi");

function buildSearchQuery(query, category) {
    if (category === "Tutorials") {
        return `${query} tutorial`;
    }

    if (category === "Documentation") {
        return `${query} official documentation`;
    }

    if (category === "GitHub") {
        return `site:github.com ${query} project`;
    }

    if (category === "Videos") {
        return `${query} tutorial video`;
    }

    if (category === "Courses") {
        return `${query} online course`;
    }

    if (category === "Practice") {
        return `${query} practice questions exercises`;
    }

    return `${query} programming learning resources`;
}

async function searchSerpAPI(query, category) {
    const searchQuery = buildSearchQuery(query, category);

    console.log("SerpApi search:", searchQuery);

    const data = await getJson({
        engine: "google",
        q: searchQuery,
        api_key: process.env.SERPAPI_KEY,
        location: "India",
        hl: "en",
        gl: "in",
        num: 10
    });

    if (data.error) {
        throw new Error(data.error);
    }

    return data.organic_results || [];
}

function detectCategory(result, requestedCategory) {
    if (requestedCategory !== "All") {
        return requestedCategory;
    }

    const text = (
        (result.title || "") +
        " " +
        (result.snippet || "") +
        " " +
        (result.link || "")
    ).toLowerCase();

    if (text.includes("github.com")) {
        return "GitHub";
    }

    if (
        text.includes("documentation") ||
        text.includes("docs")
    ) {
        return "Documentation";
    }

    if (
        text.includes("course") ||
        text.includes("coursera") ||
        text.includes("udemy")
    ) {
        return "Courses";
    }

    if (
        text.includes("youtube") ||
        text.includes("video")
    ) {
        return "Videos";
    }

    if (
        text.includes("practice") ||
        text.includes("exercise") ||
        text.includes("questions")
    ) {
        return "Practice";
    }

    if (
        text.includes("tutorial") ||
        text.includes("learn")
    ) {
        return "Tutorials";
    }

    return "Other";
}

function isRelevant(result, query) {
    const text = (
        (result.title || "") +
        " " +
        (result.snippet || "")
    ).toLowerCase();

    const words = query
        .toLowerCase()
        .split(/\s+/)
        .filter(word => word.length > 2);

    if (words.length === 0) {
        return true;
    }

    return words.some(word => text.includes(word));
}

function removeDuplicates(results) {
    const seen = new Set();

    return results.filter(result => {
        const key = (result.link || result.title || "").toLowerCase();

        if (!key || seen.has(key)) {
            return false;
        }

        seen.add(key);
        return true;
    });
}

function formatResults(results, query, category) {
    const filtered = results
        .filter(result => isRelevant(result, query))
        .map(result => ({
            title: result.title || "Untitled Resource",
            link: result.link || "#",
            snippet: result.snippet || "No description available.",
            source: result.source || getSource(result.link),
            image: result.thumbnail || "",
            category: detectCategory(result, category)
        }));

    return removeDuplicates(filtered);
}

function getSource(link) {
    try {
        return new URL(link).hostname.replace("www.", "");
    } catch {
        return "Web";
    }
}

module.exports = {
    searchSerpAPI,
    formatResults,
    buildSearchQuery
};
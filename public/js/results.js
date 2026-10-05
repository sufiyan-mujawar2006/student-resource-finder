const params = new URLSearchParams(window.location.search);

const query = params.get("q") || "";
let currentCategory = params.get("category") || "All";

const searchTitle = document.getElementById("searchTitle");
const resultCount = document.getElementById("resultCount");
const resultsBox = document.getElementById("results");
const learningPathBox = document.getElementById("learningPath");

searchTitle.textContent = `Resources for "${query}"`;

async function loadResults(category = currentCategory) {

    currentCategory = category;

    resultsBox.innerHTML = `
        <div class="loading">
            Searching resources...
        </div>
    `;

    try {

        const response = await fetch(
            `/api/search?q=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Search failed");
        }

        resultCount.textContent =
            `${data.total} resources found`;

        displayResults(data.results);

    } catch (error) {

        resultsBox.innerHTML = `
            <div class="error">
                ${escapeHtml(error.message)}
            </div>
        `;

    }
}

function displayResults(resources) {

    if (!resources || resources.length === 0) {

        resultsBox.innerHTML = `
            <div class="empty">
                <h3>No resources found</h3>
                <p>Try another topic or category.</p>
            </div>
        `;

        return;
    }

    resultsBox.innerHTML = resources.map(resource => {

        const safeResource = JSON.stringify(resource)
            .replace(/'/g, "&apos;");

        return `
            <article class="resource-card">

                ${resource.image
                    ? `<img src="${escapeHtml(resource.image)}" alt="">`
                    : ""
                }

                <div class="resource-content">

                    <div class="resource-category">
                        ${escapeHtml(resource.category || currentCategory)}
                    </div>

                    <h2>
                        ${escapeHtml(resource.title)}
                    </h2>

                    <p>
                        ${escapeHtml(resource.snippet)}
                    </p>

                    <small>
                        ${escapeHtml(resource.source || "Web")}
                    </small>

                    <div class="resource-actions">

                        <a
                            href="${escapeHtml(resource.link)}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="open-btn"
                        >
                            Open Resource
                        </a>

                        <button
                            onclick='saveResource(${safeResource})'
                            class="save-btn"
                        >
                            💾 Save
                        </button>

                    </div>

                </div>

            </article>
        `;

    }).join("");
}

async function saveResource(resource) {

    try {

        const response = await fetch("/api/resources/save", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(resource)

        });

        const data = await response.json();

        alert(data.message);

    } catch (error) {

        alert("Could not save resource.");

    }
}

async function loadLearningPath() {

    learningPathBox.innerHTML =
        "<p>Creating learning path...</p>";

    try {

        const response = await fetch(
            `/api/search/learning-path?q=${encodeURIComponent(query)}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        learningPathBox.innerHTML = data.path.map(step => {

            if (step.resource) {

                return `
                    <div class="path-step">

                        <div class="step-number">
                            ${step.title.split(".")[0]}
                        </div>

                        <div>

                            <h3>
                                ${escapeHtml(step.title)}
                            </h3>

                            <p>
                                ${escapeHtml(step.description)}
                            </p>

                            <a
                                href="${escapeHtml(step.resource.link)}"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ${escapeHtml(step.resource.title)}
                            </a>

                        </div>

                    </div>
                `;

            }

            return `
                <div class="path-step">

                    <div class="step-number">
                        ${step.title.split(".")[0]}
                    </div>

                    <div>

                        <h3>
                            ${escapeHtml(step.title)}
                        </h3>

                        <p>
                            ${escapeHtml(step.description)}
                        </p>

                    </div>

                </div>
            `;

        }).join("");

    } catch (error) {

        learningPathBox.innerHTML =
            "<p>Learning path could not be created.</p>";

    }
}

document.querySelectorAll(".category-buttons button")
    .forEach(button => {

        button.addEventListener("click", () => {

            const selected = button.dataset.category;

            loadResults(selected);

        });

    });

function escapeHtml(text) {

    const div = document.createElement("div");

    div.textContent = text || "";

    return div.innerHTML;

}

loadResults();

setTimeout(() => {

    loadLearningPath();

}, 500);
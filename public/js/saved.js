const savedBox = document.getElementById("savedResources");

async function loadSavedResources() {

    try {

        const response =
            await fetch("/api/resources/saved");

        const resources =
            await response.json();

        if (resources.length === 0) {

            savedBox.innerHTML = `
                <div class="empty">
                    <h3>No saved resources</h3>
                    <p>Save useful resources from the search page.</p>
                </div>
            `;

            return;
        }

        savedBox.innerHTML =
            resources.map(resource => `

                <article class="resource-card">

                    <div class="resource-content">

                        <div class="resource-category">
                            ${escapeHtml(resource.category)}
                        </div>

                        <h2>
                            ${escapeHtml(resource.title)}
                        </h2>

                        <p>
                            ${escapeHtml(resource.snippet)}
                        </p>

                        <small>
                            ${escapeHtml(resource.source)}
                        </small>

                        <div class="resource-actions">

                            <a
                                href="${escapeHtml(resource.link)}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="open-btn"
                            >
                                Open
                            </a>

                            <button
                                onclick="deleteResource('${resource._id}')"
                                class="delete-btn"
                            >
                                Remove
                            </button>

                        </div>

                    </div>

                </article>

            `).join("");

    } catch (error) {

        savedBox.innerHTML =
            "<p>Could not load saved resources.</p>";

    }
}

async function deleteResource(id) {

    const confirmDelete =
        confirm("Remove this resource?");

    if (!confirmDelete) {
        return;
    }

    try {

        await fetch(
            `/api/resources/saved/${id}`,
            {
                method: "DELETE"
            }
        );

        loadSavedResources();

    } catch (error) {

        alert("Could not remove resource.");

    }
}

function escapeHtml(text) {

    const div = document.createElement("div");

    div.textContent = text || "";

    return div.innerHTML;

}

loadSavedResources();
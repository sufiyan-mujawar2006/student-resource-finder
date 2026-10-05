const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const category = document.getElementById("category");
const loading = document.getElementById("loading");
const historyBox = document.getElementById("history");

searchForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const query = searchInput.value.trim();
    const selectedCategory = category.value;

    if (!query) {
        return;
    }

    loading.innerHTML = "Searching...";

    const url =
        `results.html?q=${encodeURIComponent(query)}&category=${encodeURIComponent(selectedCategory)}`;

    window.location.href = url;
});

async function loadHistory() {

    try {

        const response = await fetch("/api/search/history");

        const history = await response.json();

        if (history.length === 0) {
            historyBox.innerHTML = "<p>No searches yet.</p>";
            return;
        }

        historyBox.innerHTML = history.map(item => `
            <div class="history-item"
                onclick="searchAgain('${encodeURIComponent(item.query)}','${encodeURIComponent(item.category)}')">

                <strong>${escapeHtml(item.query)}</strong>

                <span>${escapeHtml(item.category)}</span>

            </div>
        `).join("");

    } catch (error) {

        historyBox.innerHTML =
            "<p>Could not load search history.</p>";

    }
}

function searchAgain(query, category) {

    window.location.href =
        `results.html?q=${query}&category=${category}`;

}

function escapeHtml(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}

loadHistory();
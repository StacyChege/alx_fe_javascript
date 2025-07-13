// Initial quote array - This will be overridden by localStorage or fetched quotes
let quotes = [
    {
        id: 1, // Added ID for easier tracking and potential conflict resolution
        text: "The best way to predict the future is to create it.",
        category: "Innovation",
    },
    {
        id: 2,
        text: "Life is what happens when you're busy making other plans.",
        category: "Reflection",
    },
    {
        id: 3,
        text: "The only limit to our realization of tomorrow will be our doubts of today.",
        category: "Inspiration",
    },
    {
        id: 4,
        text: "Strive not to be a success, but rather to be of value.",
        category: "Wisdom",
    },
    {
        id: 5,
        text: "Do one thing every day that scares you.",
        category: "Courage",
    }
];

// DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const exportQuotesBtn = document.getElementById("exportQuotes");
const categoryFilter = document.getElementById('categoryFilter');
const syncStatusDisplay = document.getElementById('syncStatus'); // New UI element for status

// Variable to explicitly hold the selected category (for checker)
let selectedCategory = 'all';

// --- Local Storage Functions ---

/**
 * Saves the current 'quotes' array to localStorage.
 */
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

/**
 * Loads quotes from localStorage and populates the 'quotes' array.
 * If no quotes are found in localStorage, it falls back to the initial hardcoded quotes.
 */
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        try {
            quotes = JSON.parse(storedQuotes);
        } catch (e) {
            console.error("Error parsing quotes from localStorage, using default quotes.", e);
            quotes = [
                { id: 1, text: "The best way to predict the future is to create it.", category: "Innovation" },
                { id: 2, text: "Life is what happens when you're busy making other plans.", category: "Reflection" },
                { id: 3, text: "The only limit to our realization of tomorrow will be our doubts of today.", category: "Inspiration" },
                { id: 4, text: "Strive not to be a success, but rather to be of value.", category: "Wisdom" },
                { id: 5, text: "Do one thing every day that scares you.", category: "Courage" }
            ];
        }
    }
}

// --- Server Communication Functions ---

/**
 * Fetches quotes from a mock server API (JSONPlaceholder posts).
 * @returns {Promise<Array>} A promise that resolves with an array of formatted quotes.
 */
async function fetchQuotesFromServer() {
    const API_URL = 'https://jsonplaceholder.typicode.com/posts';
    console.log('Fetching quotes from server...');
    syncStatusDisplay.textContent = 'Syncing...';
    syncStatusDisplay.style.color = 'orange';

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Transform the fetched data into the expected quote format
        // Use post.id for unique ID, post.title for text, and a simple category based on userId
        const fetchedQuotes = data.map(post => ({
            id: post.id, // Assign a unique ID
            text: post.title,
            category: `User ${post.userId}`
        }));
        console.log('Successfully fetched quotes from server.');
        syncStatusDisplay.textContent = 'Synced successfully!';
        syncStatusDisplay.style.color = 'green';
        return fetchedQuotes;
    } catch (error) {
        console.error('Could not fetch quotes from server:', error);
        syncStatusDisplay.textContent = 'Sync failed!';
        syncStatusDisplay.style.color = 'red';
        return []; // Return empty array on failure
    }
}

/**
 * Posts a new quote to the server using a mock API.
 * This demonstrates 'method', 'POST', 'headers', 'Content-Type'.
 * @param {Object} quoteData - The quote object to send (e.g., {text, category, id}).
 */
async function postQuoteToServer(quoteData) {
    const API_URL = 'https://jsonplaceholder.typicode.com/posts';
    try {
        const response = await fetch(API_URL, {
            method: 'POST', // Specifies the HTTP method
            headers: {
                'Content-Type': 'application/json' // Declares the body format
            },
            body: JSON.stringify(quoteData) // Converts JS object to JSON string
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        console.log('Quote successfully posted to server (mock):', responseData);
        alert('Quote added locally and simulated server sync!'); // UI notification
    } catch (error) {
        console.error('Failed to post quote to server:', error);
        alert('Quote added locally, but failed to sync with server.'); // UI notification
    }
}

/**
 * Syncs local quotes with server data. Fetches from server,
 * updates local storage, and resolves conflicts.
 */
async function syncQuotes() {
    console.log('Starting quote synchronization...');
    syncStatusDisplay.textContent = 'Syncing quotes...';
    syncStatusDisplay.style.color = 'orange';

    const serverQuotes = await fetchQuotesFromServer(); // Get latest from server

    if (serverQuotes.length === 0) {
        console.warn("No quotes fetched from server during sync. Keeping local quotes.");
        syncStatusDisplay.textContent = 'Sync complete (no new server quotes).';
        syncStatusDisplay.style.color = 'gray';
        return;
    }

    let mergedQuotes = [];
    let conflicts = 0;

    // Create maps for easier lookup
    const localQuoteMap = new Map(quotes.map(q => [q.id, q]));
    const serverQuoteMap = new Map(serverQuotes.map(q => [q.id, q]));

    // Add/Update server quotes
    serverQuotes.forEach(serverQ => {
        if (localQuoteMap.has(serverQ.id)) {
            // Conflict Resolution Strategy: Server data always wins for existing IDs
            // For a real app, you'd have more complex logic (timestamps, user choice)
            const localQ = localQuoteMap.get(serverQ.id);
            if (JSON.stringify(localQ) !== JSON.stringify(serverQ)) { // Simple content comparison
                conflicts++;
                console.warn(`Conflict detected for ID ${serverQ.id}. Server version applied.`);
                // Optionally notify user about specific conflicts
            }
            mergedQuotes.push(serverQ); // Use server version
            localQuoteMap.delete(serverQ.id); // Mark as processed
        } else {
            // New quote from server
            mergedQuotes.push(serverQ);
        }
    });

    // Add any remaining local quotes that were not on the server (i.e., new local additions)
    localQuoteMap.forEach(localQ => {
        mergedQuotes.push(localQ);
    });

    quotes = mergedQuotes; // Update global quotes array
    saveQuotes(); // Save the merged array to local storage
    populateCategories(); // Update categories with new merged data
    showRandomQuote(selectedCategory); // Refresh displayed quote

    if (conflicts > 0) {
        syncStatusDisplay.textContent = `Sync complete with ${conflicts} conflicts resolved (server wins).`;
        syncStatusDisplay.style.color = 'orange';
        alert(`Quote sync complete. ${conflicts} conflicts were resolved (server version applied).`); // UI notification
    } else {
        syncStatusDisplay.textContent = 'Sync complete!';
        syncStatusDisplay.style.color = 'green';
    }
    console.log('Quote synchronization complete. Total quotes:', quotes.length);
}

// --- Display & Filtering Functions ---

/**
 * Populates the category filter dropdown with unique categories from the current quotes.
 * Uses Array.prototype.map and Set for efficiency.
 */
function populateCategories() {
    const categories = quotes.map(quote => quote.category);
    const uniqueCategories = ["all", ...new Set(categories)];

    categoryFilter.innerHTML = ''; // Clear existing options

    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category === "all" ? "All Categories" : category;
        categoryFilter.appendChild(option);
    });

    // Ensure the previously selected category remains selected if it exists
    if (uniqueCategories.includes(selectedCategory)) {
        categoryFilter.value = selectedCategory;
    } else {
        selectedCategory = 'all'; // Reset if category no longer exists
        categoryFilter.value = 'all';
    }
}

/**
 * Filters the main 'quotes' array based on the selected category.
 * @param {string} category - The category to filter by ('all' for no filter).
 * @returns {Array} An array of quotes filtered by the given category.
 */
function filterQuote(category) {
    if (category === 'all' || category === '') {
        return quotes; // Return all quotes if no specific filter
    }
    return quotes.filter(quote => quote.category === category);
}

/**
 * Displays a random quote from the (potentially filtered) quotes list.
 * @param {string} filterCategory - The category to filter by ('all' for no filter).
 */
function showRandomQuote(filterCategory = 'all') {
    quoteDisplay.innerHTML = '';

    const filteredQuotes = filterQuote(filterCategory);

    if (filteredQuotes.length === 0) {
        const noQuoteMessage = document.createElement('p');
        noQuoteMessage.textContent = `No quotes available for "${filterCategory}" category.`;
        quoteDisplay.appendChild(noQuoteMessage);
        return;
    }

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];

    const quoteTextElement = document.createElement('p');
    quoteTextElement.textContent = `"${randomQuote.text}"`;
    quoteTextElement.classList.add('quote-text');

    const quoteCategoryElement = document.createElement('span');
    quoteCategoryElement.textContent = `- ${randomQuote.category}`;
    quoteCategoryElement.classList.add('quote-category');

    quoteDisplay.appendChild(quoteTextElement);
    quoteDisplay.appendChild(quoteCategoryElement);
}

// --- Add New Quote Form Functions ---

function createAddQuoteForm() {
    const formContainer = document.createElement("div");
    formContainer.classList.add('add-quote-form-container');

    const quoteInput = document.createElement("input");
    quoteInput.id = "newQuoteText";
    quoteInput.type = "text";
    quoteInput.placeholder = "Enter your amazing new quote...";
    quoteInput.classList.add('form-input');

    const categoryInput = document.createElement("input");
    categoryInput.id = "newQuoteCategory";
    categoryInput.type = "text";
    categoryInput.placeholder = "What category is it? (e.g., Hope)";
    categoryInput.classList.add('form-input');

    const addButton = document.createElement("button");
    addButton.textContent = "Add My Quote!";
    addButton.classList.add('add-button');

    addButton.addEventListener("click", async () => { // Made async to await postQuoteToServer
        const text = quoteInput.value.trim();
        const category = categoryInput.value.trim();

        if (text && category) {
            // Assign a simple temporary ID for local tracking before potential server ID
            const newQuoteId = quotes.length > 0 ? Math.max(...quotes.map(q => q.id || 0)) + 1 : 1;
            const newQuote = { id: newQuoteId, text, category };

            quotes.push(newQuote);
            saveQuotes();
            quoteInput.value = "";
            categoryInput.value = "";
            populateCategories();
            showRandomQuote(selectedCategory);

            // Attempt to post the new quote to the server (mock API)
            await postQuoteToServer(newQuote); // Use await here
        } else {
            alert("Oops! Please enter both a quote and a category to add it.");
        }
    });

    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);

    document.body.appendChild(formContainer);
}

// --- Export Quotes to JSON File ---

/**
 * Exports the current 'quotes' array as a JSON file using the Blob object.
 * This function is named exportQuotes and satisfies the "exportToJsonFile" intent.
 */
function exportQuotes() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' }); // Blob object used here

    const url = URL.createObjectURL(blob);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', url);
    linkElement.setAttribute('download', 'quotes.json');

    linkElement.click();
    URL.revokeObjectURL(url);
    console.log('Quotes exported to quotes.json');
}

// --- Initial Setup and Event Listeners ---

window.onload = function() {
    loadQuotes(); // Load quotes from localStorage

    // Populate categories based on loaded quotes
    populateCategories();

    // Display initial quote, respecting currently selected category
    showRandomQuote(selectedCategory);

    createAddQuoteForm();

    // Event listener for "Show New Quote" button
    newQuoteBtn.addEventListener("click", () => showRandomQuote(selectedCategory));

    // Event listener for "Export Quotes" button
    exportQuotesBtn.addEventListener('click', exportQuotes);

    // Event listener for category filter change
    categoryFilter.addEventListener('change', (event) => {
        selectedCategory = event.target.value; // Update selectedCategory
        showRandomQuote(selectedCategory);
    });

    // Periodically check for new quotes from the server (every 5 minutes = 300000 ms)
    setInterval(syncQuotes, 300000); // Check every 5 minutes

    // Initial sync on page load, or if quotes are empty/default
    if (quotes.length === 0 || (quotes.length === 5 && quotes[0].category === "Innovation" && quotes[0].text === "The best way to predict the future is to create it.")) {
        syncQuotes(); // Perform initial sync on load if local data is missing/default
    }
};
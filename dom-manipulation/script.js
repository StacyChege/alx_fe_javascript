// Initial quote array - This will be overridden by localStorage or fetched quotes
let quotes = [
    {
        text: "The best way to predict the future is to create it.",
        category: "Innovation",
    },
    {
        text: "Life is what happens when you're busy making other plans.",
        category: "Reflection",
    },
    {
        text: "The only limit to our realization of tomorrow will be our doubts of today.",
        category: "Inspiration",
    },
    {
        text: "Strive not to be a success, but rather to be of value.",
        category: "Wisdom",
    },
    {
        text: "Do one thing every day that scares you.",
        category: "Courage",
    }
];

// DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const exportQuotesBtn = document.getElementById("exportQuotes");
const categoryFilter = document.getElementById('categoryFilter');

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
                { text: "The best way to predict the future is to create it.", category: "Innovation" },
                { text: "Life is what happens when you're busy making other plans.", category: "Reflection" },
                { text: "The only limit to our realization of tomorrow will be our doubts of today.", category: "Inspiration" },
                { text: "Strive not to be a success, but rather to be of value.", category: "Wisdom" },
                { text: "Do one thing every day that scares you.", category: "Courage" }
            ];
        }
    }
}

// --- Fetch Quotes from Server (Mock API) ---

/**
 * Asynchronously fetches data from the mock API and processes it into quotes.
 * Uses 'https://jsonplaceholder.typicode.com/posts' as the endpoint.
 */
async function fetchQuotesFromServer() {
    const API_URL = 'https://jsonplaceholder.typicode.com/posts';

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Transform the fetched data into the expected quote format
        // Using 'title' as text and 'userId' as a simple category for demonstration
        const fetchedQuotes = data.map(post => ({
            text: post.title,
            category: `User ${post.userId}`
        }));

        quotes = fetchedQuotes; // Overwrite current quotes with fetched ones
        saveQuotes(); // Save these new quotes to local storage
        console.log('Quotes fetched from server and saved:', quotes);
        populateCategories(); // Re-populate categories with new data
        showRandomQuote(categoryFilter.value); // Display a new quote from the fetched data
    } catch (error) {
        console.error('Could not fetch quotes from server:', error);
        quoteDisplay.innerHTML = '<p style="color: red;">Failed to load quotes from server. Displaying local quotes.</p>';
        // Fallback to local quotes if server fetch fails
        loadQuotes();
        populateCategories();
        showRandomQuote(categoryFilter.value);
    }
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

    const filteredQuotes = filterQuote(filterCategory); // Use the new filterQuote function

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

    addButton.addEventListener("click", () => {
        const text = quoteInput.value.trim();
        const category = categoryInput.value.trim();

        if (text && category) {
            quotes.push({ text, category });
            saveQuotes();
            quoteInput.value = "";
            categoryInput.value = "";
            populateCategories();
            showRandomQuote(categoryFilter.value);
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
    const dataStr = JSON.stringify(quotes, null, 2); // Convert quotes to a pretty-printed JSON string
    const blob = new Blob([dataStr], { type: 'application/json' }); // Create a Blob from the JSON string

    const url = URL.createObjectURL(blob); // Create a URL for the Blob
    const linkElement = document.createElement('a'); // Create a temporary anchor element
    linkElement.setAttribute('href', url);
    linkElement.setAttribute('download', 'quotes.json'); // Set the download filename

    // Programmatically click the link to trigger the download
    linkElement.click();

    // Clean up the URL object
    URL.revokeObjectURL(url);
    console.log('Quotes exported to quotes.json');
}

// --- Initial Setup and Event Listeners ---

window.onload = function() {
    loadQuotes(); // Load quotes from localStorage first

    // Decide whether to fetch from server or use local/loaded quotes
    // Fetch only if local storage is empty or contains only initial default quotes
    // This prevents overwriting user's added quotes if they exist locally
    if (quotes.length === 0 || (quotes.length === 5 && quotes[0].category === "Innovation" && quotes[0].text === "The best way to predict the future is to create it.")) {
        fetchQuotesFromServer();
    } else {
        populateCategories(); // Populate categories based on loaded or initial quotes
        showRandomQuote(categoryFilter.value); // Display initial quote
    }

    createAddQuoteForm();

    // Event listener for "Show New Quote" button
    newQuoteBtn.addEventListener("click", () => showRandomQuote(categoryFilter.value));

    // Event listener for "Export Quotes" button
    exportQuotesBtn.addEventListener('click', exportQuotes);

    // Event listener for category filter change
    categoryFilter.addEventListener('change', (event) => {
        showRandomQuote(event.target.value);
    });
};
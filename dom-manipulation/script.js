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
const exportQuotesBtn = document.getElementById("exportQuotes"); // New export button
const categoryFilter = document.getElementById('categoryFilter'); // New category filter dropdown

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
            // Overwrite the 'quotes' array with the stored ones
            quotes = JSON.parse(storedQuotes);
        } catch (e) {
            console.error("Error parsing quotes from localStorage, using default quotes.", e);
            // Fallback to initial quotes if parsing fails
            quotes = [
                { text: "The best way to predict the future is to create it.", category: "Innovation" },
                { text: "Life is what happens when you're busy making other plans.", category: "Reflection" },
                { text: "The only limit to our realization of tomorrow will be our doubts of today.", category: "Inspiration" },
                { text: "Strive not to be a success, but rather to be of value.", category: "Wisdom" },
                { text: "Do one thing every day that scares you.", category: "Courage" }
            ];
        }
    }
    // If localStorage is empty, the initial 'quotes' array will be used.
}

// --- Fetch Quotes from Server (Placeholder) ---

/**
 * Asynchronously fetches quotes from a hypothetical external server.
 * Replace 'YOUR_API_ENDPOINT_HERE' with an actual API URL if available.
 */
async function fetchQuotesFromServer() {
    // Placeholder API URL - you'd replace this with a real quote API if available
    const API_URL = 'https://api.quotable.io/quotes/random?limit=5'; // Example public API
    // Or, for local testing, you might fetch from a local JSON file:
    // const API_URL = 'quotes.json';

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const serverQuotes = await response.json();

        // Ensure quotes have 'text' and 'category' properties.
        // The quotable.io API has 'content' and 'tags'. We'll map them.
        const formattedQuotes = serverQuotes.map(q => ({
            text: q.content,
            category: q.tags && q.tags.length > 0 ? q.tags[0] : 'General' // Use first tag or 'General'
        }));

        // Replace existing quotes with fetched ones
        quotes = formattedQuotes;
        saveQuotes(); // Save fetched quotes to local storage
        console.log('Quotes fetched from server and saved:', quotes);
        populateCategories(); // Re-populate categories with new quotes
        showRandomQuote(categoryFilter.value); // Display a quote respecting current filter
    } catch (error) {
        console.error('Could not fetch quotes from server:', error);
        // Fallback or inform user if fetch fails
        quoteDisplay.innerHTML = '<p>Failed to load quotes from server. Displaying local quotes.</p>';
        // If quotes were cleared before fetch, re-load from local storage if needed
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
    // Extract all categories, then get only unique ones using Set
    const categories = quotes.map(quote => quote.category);
    const uniqueCategories = ["all", ...new Set(categories)]; // Add 'all' option

    // Clear existing options and add the 'All Categories' option first
    categoryFilter.innerHTML = '';
    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category === "all" ? "All Categories" : category;
        categoryFilter.appendChild(option);
    });
}

/**
 * Displays a random quote from the 'quotes' array based on an optional filter category.
 * This function demonstrates advanced DOM manipulation by creating new HTML elements.
 * @param {string} filterCategory - The category to filter by ('all' for no filter).
 */
function showRandomQuote(filterCategory = 'all') {
    quoteDisplay.innerHTML = ''; // Clear any existing content

    let filteredQuotes = quotes;
    if (filterCategory !== 'all' && filterCategory !== '') {
        // Use filter to get quotes matching the selected category
        filteredQuotes = quotes.filter(quote => quote.category === filterCategory);
    }

    if (filteredQuotes.length === 0) {
        const noQuoteMessage = document.createElement('p');
        noQuoteMessage.textContent = `No quotes available for "${filterCategory}" category.`;
        // No inline CSS here, assuming styling is in new-style.css
        quoteDisplay.appendChild(noQuoteMessage);
        return;
    }

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];

    const quoteTextElement = document.createElement('p');
    quoteTextElement.textContent = `"${randomQuote.text}"`;
    quoteTextElement.classList.add('quote-text'); // Add a class for CSS styling

    const quoteCategoryElement = document.createElement('span');
    quoteCategoryElement.textContent = `- ${randomQuote.category}`;
    quoteCategoryElement.classList.add('quote-category'); // Add a class for CSS styling

    quoteDisplay.appendChild(quoteTextElement);
    quoteDisplay.appendChild(quoteCategoryElement);
}

// --- Add New Quote Form Functions ---

/**
 * Creates and appends a form for adding new quotes to the document body.
 * This function also handles the logic for adding a new quote to the array
 * and updating the display when the 'Add Quote' button is clicked.
 */
function createAddQuoteForm() {
    const formContainer = document.createElement("div");
    formContainer.classList.add('add-quote-form-container'); // Add class for CSS styling

    const quoteInput = document.createElement("input");
    quoteInput.id = "newQuoteText";
    quoteInput.type = "text";
    quoteInput.placeholder = "Enter your amazing new quote...";
    quoteInput.classList.add('form-input'); // Add class for CSS styling

    const categoryInput = document.createElement("input");
    categoryInput.id = "newQuoteCategory";
    categoryInput.type = "text";
    categoryInput.placeholder = "What category is it? (e.g., Hope)";
    categoryInput.classList.add('form-input'); // Add class for CSS styling

    const addButton = document.createElement("button");
    addButton.textContent = "Add My Quote!";
    addButton.classList.add('add-button'); // Add class for CSS styling

    addButton.addEventListener("click", () => {
        const text = quoteInput.value.trim();
        const category = categoryInput.value.trim();

        if (text && category) {
            quotes.push({ text, category }); // Add the new quote to the array
            saveQuotes(); // Save updated quotes to local storage
            quoteInput.value = ""; // Clear the input field
            categoryInput.value = ""; // Clear the category field
            populateCategories(); // Update categories dropdown with new category
            showRandomQuote(categoryFilter.value); // Display a new random quote respecting filter
        } else {
            alert("Oops! Please enter both a quote and a category to add it.");
        }
    });

    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);

    document.body.appendChild(formContainer);
}

// --- Export Quotes Function ---

/**
 * Exports the current quotes array as a JSON file.
 * This function is tied to the "Export Quotes" button.
 */
function exportQuotes() {
    const dataStr = JSON.stringify(quotes, null, 2); // Convert quotes array to JSON string, pretty-printed
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileName = 'quotes.json';

    const linkElement = document.createElement('a'); // Create a temporary anchor element
    linkElement.setAttribute('href', dataUri); // Set its href to the data URI
    linkElement.setAttribute('download', exportFileName); // Set the download filename
    linkElement.click(); // Programmatically click the link to trigger the download
    console.log('Quotes exported to quotes.json');
}

// --- Initial Setup and Event Listeners ---

window.onload = function() {
    loadQuotes(); // 1. Load quotes from localStorage
    populateCategories(); // 2. Populate filter dropdown with loaded quotes
    showRandomQuote(categoryFilter.value); // 3. Display an initial random quote, respecting filter
    createAddQuoteForm(); // 4. Create and display the add quote form

    // Optional: Fetch from server only if local storage is empty initially
    // This prevents overwriting user's local quotes on every load if they have added some
    if (quotes.length === 0 || quotes.every(q => q.category === 'General' && q.text === '')) { // Simple check for truly empty or default state
         fetchQuotesFromServer();
    }


    // Event listener for "Show New Quote" button
    newQuoteBtn.addEventListener("click", () => showRandomQuote(categoryFilter.value));

    // Event listener for "Export Quotes" button
    exportQuotesBtn.addEventListener('click', exportQuotes); // Use the new const for the button

    // Event listener for category filter change
    categoryFilter.addEventListener('change', (event) => {
        showRandomQuote(event.target.value); // Call showRandomQuote with the selected category
    });
};
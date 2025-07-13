// Initial quote array
const quotes = [
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

/**
 * Displays a random quote from the 'quotes' array in the 'quoteDisplay' div.
 * This function demonstrates advanced DOM manipulation by creating new
 * HTML elements for the quote text and category, and then appending them.
 */
function showRandomQuote() {
    // Clear any existing content in the quote display area
    quoteDisplay.innerHTML = '';

    // Check if there are any quotes to display
    if (quotes.length === 0) {
        const noQuoteMessage = document.createElement('p');
        noQuoteMessage.textContent = 'No quotes available. Add some!';
        noQuoteMessage.style.fontStyle = 'italic';
        noQuoteMessage.style.color = '#8A2BE2'; // Purple for no quotes message
        quoteDisplay.appendChild(noQuoteMessage);
        return;
    }

    // Get a random index
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Create a paragraph element for the quote text
    const quoteTextElement = document.createElement('p');
    quoteTextElement.textContent = `"${randomQuote.text}"`;
    quoteTextElement.style.fontSize = '1.8em'; // Slightly larger font
    quoteTextElement.style.fontWeight = 'bold';
    quoteTextElement.style.marginBottom = '8px'; // Increased margin
    quoteTextElement.style.color = '#4A0080'; // Darker purple for quote text

    // Create a span element for the quote category
    const quoteCategoryElement = document.createElement('span');
    quoteCategoryElement.textContent = `- ${randomQuote.category}`;
    quoteCategoryElement.style.fontSize = '1.1em'; // Slightly larger category font
    quoteCategoryElement.style.color = '#8A2BE2'; // Medium purple for category

    // Append the created elements to the quote display div
    quoteDisplay.appendChild(quoteTextElement);
    quoteDisplay.appendChild(quoteCategoryElement);
}

/**
 * Creates and appends a form for adding new quotes to the document body.
 * This function also handles the logic for adding a new quote to the array
 * and updating the display when the 'Add Quote' button is clicked.
 */
function createAddQuoteForm() {
    // Create a container div for the form elements
    const formContainer = document.createElement("div");
    formContainer.style.marginTop = '30px'; // Increased top margin
    formContainer.style.padding = '20px'; // Increased padding
    formContainer.style.border = '1px solid #C0C0C0'; // Lighter border
    formContainer.style.borderRadius = '10px'; // More rounded corners
    formContainer.style.backgroundColor = '#F5EEFC'; // Very light purple background
    formContainer.style.display = 'flex';
    formContainer.style.flexDirection = 'column';
    formContainer.style.gap = '12px'; // Increased gap
    formContainer.style.maxWidth = '450px'; // Slightly wider form
    formContainer.style.margin = '30px auto'; // Center the form, adjust top margin

    // Create the input field for the new quote text
    const quoteInput = document.createElement("input");
    quoteInput.id = "newQuoteText"; // Assign ID as per instructions
    quoteInput.type = "text";
    quoteInput.placeholder = "Enter your amazing new quote..."; // More engaging placeholder
    quoteInput.style.padding = '10px'; // Increased padding
    quoteInput.style.borderRadius = '5px';
    quoteInput.style.border = '1px solid #9370DB'; // Medium purple border
    quoteInput.style.boxSizing = 'border-box'; // Include padding and border in element's total width and height

    // Create the input field for the new quote category
    const categoryInput = document.createElement("input");
    categoryInput.id = "newQuoteCategory"; // Assign ID as per instructions
    categoryInput.type = "text";
    categoryInput.placeholder = "What category is it? (e.g., Hope)"; // More engaging placeholder
    categoryInput.style.padding = '10px';
    categoryInput.style.borderRadius = '5px';
    categoryInput.style.border = '1px solid #9370DB'; // Medium purple border
    categoryInput.style.boxSizing = 'border-box';

    // Create the 'Add Quote' button
    const addButton = document.createElement("button");
    addButton.textContent = "Add My Quote!"; // More enthusiastic button text
    addButton.style.padding = '12px 20px'; // Increased padding
    addButton.style.borderRadius = '6px';
    addButton.style.border = 'none';
    addButton.style.backgroundColor = '#9932CC'; // Darker purple
    addButton.style.color = 'white';
    addButton.style.cursor = 'pointer';
    addButton.style.fontWeight = 'bold'; // Bold button text
    addButton.style.transition = 'background-color 0.3s ease, transform 0.1s ease'; // Add transform transition

    // Add hover and active effects for the button
    addButton.onmouseover = () => addButton.style.backgroundColor = '#8A2BE2'; // Medium purple on hover
    addButton.onmouseout = () => addButton.style.backgroundColor = '#9932CC'; // Back to darker purple
    addButton.onmousedown = () => addButton.style.transform = 'scale(0.98)'; // Slight shrink on click
    addButton.onmouseup = () => addButton.style.transform = 'scale(1)'; // Return to normal size

    // Add an event listener to the 'Add Quote' button
    addButton.addEventListener("click", () => {
        const text = quoteInput.value.trim();
        const category = categoryInput.value.trim();

        // Only add the quote if both fields are not empty
        if (text && category) {
            quotes.push({ text, category }); // Add the new quote to the array
            quoteInput.value = ""; // Clear the input field
            categoryInput.value = ""; // Clear the category field
            showRandomQuote(); // Display a new random quote (could be the newly added one)
        } else {
            // Simple feedback for the user if fields are empty
            alert("Oops! Please enter both a quote and a category to add it.");
        }
    });

    // Append all created elements to the form container
    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);

    // Append the entire form container to the document body
    document.body.appendChild(formContainer);
}

// --- Initial Setup and Event Listeners ---

// 1. Display an initial random quote when the page loads
window.onload = function() {
    showRandomQuote();
    // 2. Create and display the form for adding new quotes
    createAddQuoteForm();
}

// Add event listener to the "Show New Quote" button
newQuoteBtn.addEventListener("click", showRandomQuote);

// --- Local Storage Integration ---

// Function to save quotes to localStorage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to load quotes from localStorage
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        // Parse the JSON string back into a JavaScript array
        quotes.splice(0, quotes.length, ...JSON.parse(storedQuotes));
    }
}

// Modify the addButton click listener to save quotes after adding
addButton.addEventListener("click", () => {
    const text = quoteInput.value.trim();
    const category = categoryInput.value.trim();

    if (text && category) {
        quotes.push({ text, category }); // Add the new quote to the array
        saveQuotes(); // Call saveQuotes after adding a new quote
        quoteInput.value = "";
        categoryInput.value = "";
        showRandomQuote();
    } else {
        alert("Oops! Please enter both a quote and a category to add it.");
    }
});

// Modify window.onload to load quotes when the page starts
window.onload = function() {
    loadQuotes(); // Load quotes before displaying the initial random quote
    showRandomQuote();
    createAddQuoteForm();
}

// ... (rest of your existing script.js code) ...
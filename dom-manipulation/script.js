// Initial quote array
const quotes = [
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        category: "Inspiration",
    },
    {
        text: "The only way to do great work is to love what you do.",
        category: "Passion",
    },
    {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        category: "Resilience",
    },
    {
        text: "Innovation distinguishes between a leader and a follower.",
        category: "Leadership",
    },
    {
        text: "The mind is everything. What you think you become.",
        category: "Mindset",
    },
    {
        text: "Life is 10% what happens to us and 90% how we react to it.",
        category: "Attitude",
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
        // CSS properties removed from here
        quoteDisplay.appendChild(noQuoteMessage);
        return;
    }

    // Get a random index
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Create a paragraph element for the quote text
    const quoteTextElement = document.createElement('p');
    quoteTextElement.textContent = `"${randomQuote.text}"`;
    // CSS properties removed from here

    // Create a span element for the quote category
    const quoteCategoryElement = document.createElement('span');
    quoteCategoryElement.textContent = `- ${randomQuote.category}`;
    // CSS properties removed from here

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
    // CSS properties removed from here

    // Create the input field for the new quote text
    const quoteInput = document.createElement("input");
    quoteInput.id = "newQuoteText"; // Assign ID as per instructions
    quoteInput.type = "text";
    quoteInput.placeholder = "Enter your amazing new quote...";
    // CSS properties removed from here

    // Create the input field for the new quote category
    const categoryInput = document.createElement("input");
    categoryInput.id = "newQuoteCategory"; // Assign ID as per instructions
    categoryInput.type = "text";
    categoryInput.placeholder = "What category is it? (e.g., Hope)";
    // CSS properties removed from here

    // Create the 'Add Quote' button
    const addButton = document.createElement("button");
    addButton.textContent = "Add My Quote!";
    // CSS properties removed from here

    // Add hover and active effects for the button
    // CSS properties removed from here for hover/active

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
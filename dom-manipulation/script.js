// script.js

// Manage an array of quote objects where each quote has a text and a category.
const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
    { text: "Innovation distinguishes between a leader and a follower.", category: "Innovation" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", category: "Dreams" },
    { text: "Strive not to be a success, but rather to be of value.", category: "Value" },
    { text: "Life is what happens when you’re busy making other plans.", category: "Life" }
];

// Select DOM elements
const quoteDisplayText = document.getElementById('quote-text');
const quoteDisplayCategory = document.getElementById('quote-category');
const newQuoteButton = document.getElementById('newQuote');
const addQuoteFormContainer = document.getElementById('addQuoteFormContainer');

// Implement function to display a random quote and update the DOM.
function showRandomQuote() {
    // Check if there are any quotes available
    if (quotes.length === 0) {
        // Use innerHTML to update the display for no quotes available.
        quoteDisplayText.innerHTML = "No quotes available. Add some!";
        quoteDisplayCategory.innerHTML = "";
        return;
    }

    // Logic to select a random quote:
    // Generate a random index to select a quote from the array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Update the DOM to display the selected random quote:
    // Using innerHTML to set the quote text.
    quoteDisplayText.innerHTML = `"${randomQuote.text}"`;
    // Using innerHTML to set the quote category.
    quoteDisplayCategory.innerHTML = `- ${randomQuote.category}`;
}

// Implement function to create the dynamic quote addition form.
// This function dynamically creates the form elements and appends them to the DOM.
function createAddQuoteForm() {
    // Create the main div for the form
    const formDiv = document.createElement('div');
    
    // Create the input field for new quote text
    const newQuoteTextInput = document.createElement('input');
    newQuoteTextInput.setAttribute('id', 'newQuoteText');
    newQuoteTextInput.setAttribute('type', 'text');
    newQuoteTextInput.setAttribute('placeholder', 'Enter a new quote');

    // Create the input field for new quote category
    const newQuoteCategoryInput = document.createElement('input');
    newQuoteCategoryInput.setAttribute('id', 'newQuoteCategory');
    newQuoteCategoryInput.setAttribute('type', 'text');
    newQuoteCategoryInput.setAttribute('placeholder', 'Enter quote category');

    // Create the "Add Quote" button
    const addQuoteBtn = document.createElement('button');
    addQuoteBtn.textContent = "Add Quote";
    // Attach the addQuote function to the click event of this button
    addQuoteBtn.onclick = addQuote; // Directly assigns the function reference for the event handler

    // Create a feedback paragraph for messages (e.g., success or error when adding a quote)
    const addFeedback = document.createElement('p');
    addFeedback.setAttribute('id', 'add-feedback');

    // Append all created elements to the form container div.
    formDiv.appendChild(newQuoteTextInput);
    formDiv.appendChild(newQuoteCategoryInput);
    formDiv.appendChild(addQuoteBtn);
    formDiv.appendChild(addFeedback); // Add the feedback element to the form

    // Append the entire dynamically created form div to its designated container in the HTML.
    addQuoteFormContainer.appendChild(formDiv);
}

// Implement the addQuote function:
// This function handles adding a new quote based on user input from the form.
function addQuote() {
    // Get the input elements by their IDs.
    const newQuoteTextInput = document.getElementById('newQuoteText');
    const newQuoteCategoryInput = document.getElementById('newQuoteCategory');
    const addFeedback = document.getElementById('add-feedback');

    // Get and trim the values from the input fields to remove leading/trailing whitespace.
    const text = newQuoteTextInput.value.trim();
    const category = newQuoteCategoryInput.value.trim();

    // Basic validation: Check if both text and category are provided.
    if (text === "" || category === "") {
        addFeedback.textContent = "Please enter both quote text and category.";
        addFeedback.classList.remove('success'); // Ensure feedback is not green for errors
        return; // Exit the function if validation fails.
    }

    // Logic to add a new quote to the quotes array:
    // Create a new quote object with the user-provided text and category.
    const newQuote = { text: text, category: category };

    // Add the new quote object to the global 'quotes' array.
    quotes.push(newQuote);

    // Clear the input fields after successfully adding the quote.
    newQuoteTextInput.value = '';
    newQuoteCategoryInput.value = '';

    // Update the DOM to provide user feedback:
    addFeedback.textContent = "Quote added successfully!";
    addFeedback.classList.add('success'); // Apply a 'success' class for styling (e.g., green text).

    // Optionally, you could uncomment the line below if you want the newly added quote
    // or a new random quote to be displayed immediately after addition.
    // showRandomQuote();
    
    // Clear the feedback message after a short delay (e.g., 3 seconds) for a cleaner UI.
    setTimeout(() => {
        addFeedback.textContent = '';
        addFeedback.classList.remove('success'); // Remove the success class.
    }, 3000);
}

// Event listener for DOMContentLoaded:
// This ensures that the JavaScript code runs only after the entire HTML document has been fully loaded and parsed.
document.addEventListener('DOMContentLoaded', () => {
    // Call showRandomQuote to display an initial random quote when the page first loads.
    showRandomQuote();

    // Attach an event listener to the "Show New Quote" button:
    // When this button is clicked, the showRandomQuote function will be executed.
    newQuoteButton.addEventListener('click', showRandomQuote);

    // Dynamically create and append the Add Quote form to the page.
    createAddQuoteForm();
});

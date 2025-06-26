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

// Implement function to display a random quote
function showRandomQuote() {
    // Check if there are any quotes available
    if (quotes.length === 0) {
        // Use innerHTML as requested, though for plain text, textContent would also work.
        quoteDisplayText.innerHTML = "No quotes available. Add some!";
        quoteDisplayCategory.innerHTML = "";
        return;
    }

    // Generate a random index to select a quote from the array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Display the quote text and category in the respective elements
    // Using innerHTML as per the requirement, although textContent is generally safer for plain text to prevent XSS.
    quoteDisplayText.innerHTML = `"${randomQuote.text}"`;
    quoteDisplayCategory.innerHTML = `- ${randomQuote.category}`;
}

// Implement function to create the dynamic quote addition form
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
    addQuoteBtn.onclick = addQuote; // We directly assign the function reference

    // Create a feedback paragraph for messages
    const addFeedback = document.createElement('p');
    addFeedback.setAttribute('id', 'add-feedback');

    // Append elements to the form container
    formDiv.appendChild(newQuoteTextInput);
    formDiv.appendChild(newQuoteCategoryInput);
    formDiv.appendChild(addQuoteBtn);
    formDiv.appendChild(addFeedback); // Add the feedback element

    // Append the entire form div to its designated container in the HTML
    addQuoteFormContainer.appendChild(formDiv);
}

// Function to add a new quote from the form inputs
function addQuote() {
    // Get the input elements by their IDs
    const newQuoteTextInput = document.getElementById('newQuoteText');
    const newQuoteCategoryInput = document.getElementById('newQuoteCategory');
    const addFeedback = document.getElementById('add-feedback');

    // Get and trim the values from the input fields
    const text = newQuoteTextInput.value.trim();
    const category = newQuoteCategoryInput.value.trim();

    // Basic validation
    if (text === "" || category === "") {
        addFeedback.textContent = "Please enter both quote text and category.";
        addFeedback.classList.remove('success'); // Ensure it's not green
        return;
    }

    // Create a new quote object
    const newQuote = { text: text, category: category };

    // Add the new quote to the global quotes array
    quotes.push(newQuote);

    // Clear the input fields after adding
    newQuoteTextInput.value = '';
    newQuoteCategoryInput.value = '';

    // Provide user feedback
    addFeedback.textContent = "Quote added successfully!";
    addFeedback.classList.add('success'); // Make success message green

    // Optionally, display the newly added quote or a random one
    // showRandomQuote(); // Uncomment if you want to show a new random quote after adding
    
    // Clear feedback message after a short delay
    setTimeout(() => {
        addFeedback.textContent = '';
        addFeedback.classList.remove('success');
    }, 3000);
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Call showRandomQuote to display an initial quote when the page loads
    showRandomQuote();

    // Attach click listener to the "Show New Quote" button
    newQuoteButton.addEventListener('click', showRandomQuote);

    // Dynamically create and append the Add Quote form
    createAddQuoteForm();
});

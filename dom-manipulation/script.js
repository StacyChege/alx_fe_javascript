// Array of quotes with categories
let quotes = [
  { text: "Believe you can and you're halfway there.", category: "Motivation" },
  { text: "Imagination is more important than knowledge.", category: "Creativity" },
  { text: "The best way to predict the future is to create it.", category: "Inspiration" }
];

// Display a random quote
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  document.getElementById("quoteDisplay").innerHTML = `
    <p><strong>Quote:</strong> ${quote.text}</p>
    <p><strong>Category:</strong> ${quote.category}</p>
  `;
}

// Update the event listener to use the new name
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);

// Form to add new quote
function createAddQuoteForm() {
  document.getElementById("formContainer").innerHTML = `
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <button onclick="addQuote()">Add Quote</button>
  `;
}

// Add new quote to array and display confirmation
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text && category) {
    quotes.push({ text, category });
    alert("Quote added!");
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("Please enter both quote and category.");
  }
}

// Create the form on page load
createAddQuoteForm();

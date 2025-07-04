// Set up the full HTML layout dynamically using innerHTML
document.body.innerHTML = `
  <h1>Dynamic Quote Generator</h1>
  <div id="quoteDisplay"></div>
  <button id="newQuote">Show New Quote</button>
  <div id="formContainer"></div>
`;

// Array of quotes with categories
let quotes = [
  { text: "Believe you can and you're halfway there.", category: "Motivation" },
  { text: "Imagination is more important than knowledge.", category: "Creativity" },
  { text: "The best way to predict the future is to create it.", category: "Inspiration" }
];

// Function to display a random quote
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  document.getElementById("quoteDisplay").innerHTML = `
    <p><strong>Quote:</strong> ${quote.text}</p>
    <p><strong>Category:</strong> ${quote.category}</p>
  `;
}

// Function to create the form dynamically
function createAddQuoteForm() {
  document.getElementById("formContainer").innerHTML = `
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <button onclick="addQuote()">Add Quote</button>
  `;
}

// Function to add new quotes to the array and update UI
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

// Set up event listener and show the form
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
createAddQuoteForm();

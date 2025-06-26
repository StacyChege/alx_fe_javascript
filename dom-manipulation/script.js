const quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Creativity is intelligence having fun.", category: "Inspiration" },
];

function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" — (${quote.category})`;
}

function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");
  const feedback = document.getElementById("addFeedback");

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (newText.length < 5 || newCategory.length < 2) {
    feedback.textContent = "Please enter a valid quote and category.";
    feedback.style.color = "red";
    return;
  }

  quotes.push({ text: newText, category: newCategory });
  feedback.textContent = "Quote added successfully!";
  feedback.style.color = "green";

  textInput.value = "";
  categoryInput.value = "";
}

document.getElementById("newQuote").addEventListener("click", showRandomQuote);

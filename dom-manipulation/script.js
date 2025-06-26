const quotes = [
  { text: "Every expert was once a beginner.", category: "motivation" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "humor" },
  { text: "Consistency is more important than perfection.", category: "motivation" },
  { text: "Don’t worry if it doesn’t work right. If everything did, you’d be out of a job.", category: "humor" },
  { text: "The best error message is the one that never shows up.", category: "clean code" },
];

function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  const quoteDisplay = document.getElementById("quoteDisplay");

  // ✅ Use innerHTML explicitly
  quoteDisplay.innerHTML = `<p>${quote.text}</p><small>Category: ${quote.category}</small>`;
}

function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();
  const quoteDisplay = document.getElementById("quoteDisplay");

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    quoteDisplay.innerHTML = `<p>New quote added successfully!</p>`;
  } else {
    quoteDisplay.innerHTML = `<p>Please fill in both the quote and category fields.</p>`;
  }
}

// ✅ Add event listener to "Show New Quote" button
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("newQuote");
  button.addEventListener("click", displayRandomQuote);
});

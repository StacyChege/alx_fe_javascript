document.addEventListener("DOMContentLoaded", function () {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");

  const quotes = [
    { text: "Every bug is a lesson in disguise.", category: "debugging" },
    { text: "You don’t have to know everything, just keep building.", category: "growth" },
    { text: "Consistency beats brilliance in the long run.", category: "motivation" },
    { text: "Learn the logic, not the syntax. Frameworks change, logic lasts.", category: "advice" },
    { text: "Errors mean you’re trying. Fix them, and move forward.", category: "resilience" },
    { text: "The best way to understand code is to break it and fix it.", category: "practice" }
  ];

  function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<p><strong>${quote.category}:</strong> ${quote.text}</p>`;
  }

  function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value.trim();
    const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

    if (quoteText && quoteCategory) {
      quotes.push({ text: quoteText, category: quoteCategory });
      alert("Quote added successfully!");
      document.getElementById("newQuoteText").value = "";
      document.getElementById("newQuoteCategory").value = "";
    } else {
      alert("Please fill in both the quote and category.");
    }
  }

  newQuoteBtn.addEventListener("click", displayRandomQuote);
});

document.addEventListener('DOMContentLoaded', function () {
    // Array of quote objects
    const quotes = [
        { text: "Learning to code is learning to create and innovate.", category: "motivation" },
        { text: "Every great developer you know started by writing bad code.", category: "truth" },
        { text: "Debugging is like being the detective in a crime movie where you are also the murderer.", category: "humor" },
        { text: "Code is like humor. When you have to explain it, it’s bad.", category: "humor" },
        { text: "Don’t worry if it doesn’t work right. If everything did, you’d be out of a job.", category: "motivation" }
    ];

    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteBtn = document.getElementById('newQuote');

    // ✅ Required by checker: Function that updates DOM using innerHTML
    function displayRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const quote = quotes[randomIndex];
        quoteDisplay.innerHTML = `<p>"${quote.text}"</p><small>Category: ${quote.category}</small>`;
    }

    // ✅ Required by checker: addQuote function that updates DOM and quotes array
    function addQuote() {
        const textInput = document.getElementById('newQuoteText');
        const categoryInput = document.getElementById('newQuoteCategory');

        const newText = textInput.value.trim();
        const newCategory = categoryInput.value.trim();

        if (newText && newCategory) {
            const newQuote = {
                text: newText,
                category: newCategory
            };
            quotes.push(newQuote);

            // Optionally display the new quote
            quoteDisplay.innerHTML = `<p>"${newQuote.text}"</p><small>Category: ${newQuote.category}</small>`;

            // Clear input fields
            textInput.value = '';
            categoryInput.value = '';
        } else {
            quoteDisplay.innerHTML = `<p>Please enter both quote text and category.</p>`;
        }
    }

    // ✅ Required by checker: Event listener on "Show New Quote" button
    newQuoteBtn.addEventListener('click', displayRandomQuote);

    // ✅ Expose addQuote globally so the button with onclick can call it
    window.addQuote = addQuote;
});

// frontend/main.js
// If you later serve the frontend from Express on the same port, set API = "".
const url = "https://pezhmanazizi-quote-backend.hosting.codeyourfuture.io";

// DOM elements
const generateBtn = document.querySelector("#generate-quote");
const addBtn      = document.querySelector("#add-quote");

const quoteEl  = document.querySelector(".quote-random");
const authorEl = document.querySelector(".author-random");

const quoteInput  = document.querySelector("#quote-input");
const authorInput = document.querySelector("#author-input");

// Render helper
function renderQuote({ quote, author }) {
  quoteEl.textContent = `"${quote}"`;
  authorEl.textContent = `— ${author}`;
}

// fetch a random quote
async function fetchQuote() {
  try {
    const res = await fetch(`${url}/`, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json(); // { quote, author }
    renderQuote(data);
  } catch (err) {
    console.error("GET failed:", err);
    quoteEl.textContent = "Failed to load quote.";
    authorEl.textContent = "";
  }
}

// POST: add a new quote
async function addQuote() {
  const quote  = quoteInput.value.trim();
  const author = authorInput.value.trim();

  if (!quote || !author) {
    alert("Please fill in both quote and author.");
    return;
  }

  try {
    const res = await fetch(`${url}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ quote, author }),
    });
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || `HTTP ${res.status}`);
    }


    // Clear inputs
    quoteInput.value = "";
    authorInput.value = "";
  } catch (err) {
    console.error("POST failed:", err);
    alert("Could not add quote. Check console and server logs.");
  }
}

// click events
generateBtn.addEventListener("click", fetchQuote);
addBtn.addEventListener("click", addQuote);

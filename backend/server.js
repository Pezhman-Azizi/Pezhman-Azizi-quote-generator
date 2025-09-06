// backend/server.js
import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

// Middleware
app.use(cors());          
app.use(express.json());  // parse JSON bodies

// In‑memory data (stateful; resets on server restart)
const quotes = [
  { quote: "Either write something worth reading or do something worth writing.", author: "Benjamin Franklin" },
  { quote: "I should have been more kind.", author: "Clive James" },
];

function randomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

// GET /  -> { quote, author }
app.get("/", (req, res) => {
  res.json(randomQuote());
});

// POST /  body: { quote, author }  -> { ok: true, count }
app.post("/", (req, res) => {
  const { quote, author } = req.body || {};
  if (typeof quote !== "string" || typeof author !== "string" || !quote.trim() || !author.trim()) {
    return res.status(400).json({ error: "Expected JSON: { quote: string, author: string }" });
  }
  quotes.push({ quote: quote.trim(), author: author.trim() });
  res.json({ ok: true, count: quotes.length });
});

app.listen(port, () => {
  console.log(`Quote server listening on http://127.0.0.1:${port}`);
});


console.log("hello from backend");

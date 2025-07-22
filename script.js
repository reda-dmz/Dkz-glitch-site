const res = await fetch("/api/generate-world", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ word1: w1, word2: w2, word3: w3 }),
});

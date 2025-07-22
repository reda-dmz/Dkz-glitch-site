const response = await fetch("/api/generate-world", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ word1, word2, word3 })
});

const data = await response.json();
document.getElementById("output").textContent = data.result || "No story generated.";

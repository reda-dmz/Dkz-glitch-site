const btn = document.getElementById("generateBtn");
btn.addEventListener("click", async () => {
  const w1 = document.getElementById("word1").value;
  const w2 = document.getElementById("word2").value;
  const w3 = document.getElementById("word3").value;

  if (!w1 || !w2 || !w3) return alert("Enter all 3 words!");

  const output = document.getElementById("output");
  output.textContent = "Generating...";

  try {
    const res = await fetch("/api/generate-world", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word1: w1, word2: w2, word3: w3 })
    });
    if (!res.ok) return alert("Server error: " + res.status);
    const data = await res.json();
    output.textContent = data.result;
  } catch {
    alert("Network error or invalid JSON");
  }
});

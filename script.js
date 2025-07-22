async function generateStory() {
  const w1 = document.getElementById("word1").value;
  const w2 = document.getElementById("word2").value;
  const w3 = document.getElementById("word3").value;

  try {
    const res = await fetch("/api/generate-world", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word1: w1, word2: w2, word3: w3 }),
    });

    if (!res.ok) throw new Error("API error");

    const data = await res.json();
    document.getElementById("output").innerText = data.story || "No story returned.";
  } catch (err) {
    console.error("Error:", err);
    document.getElementById("output").innerText = "Failed to generate story.";
  }
}

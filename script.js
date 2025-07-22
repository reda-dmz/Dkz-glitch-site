generateBtn.addEventListener("click", async () => {
  const word1 = word1Input.value;
  const word2 = word2Input.value;
  const word3 = word3Input.value;

  if (!word1 || !word2 || !word3) {
    alert("Please enter all 3 words.");
    return;
  }

  resultDiv.textContent = "Generating...";

  try {
    const response = await fetch("/api/generate-world", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ word1, word2, word3 })
    });

    if (!response.ok) {
      alert("Fetch failed: " + response.status);
      throw new Error("Fetch error: " + response.status);
    }

    const data = await response.json();
    resultDiv.textContent = data.result;
  } catch (error) {
    alert("Error: " + error.message);
    resultDiv.textContent = "Error generating story.";
  }
});

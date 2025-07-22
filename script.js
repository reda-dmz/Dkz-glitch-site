async function generateStory() {
  const word1 = document.getElementById("word1").value;
  const word2 = document.getElementById("word2").value;
  const word3 = document.getElementById("word3").value;

  const prompt = `Generate a short, weird fictional world or story using these 3 words: "${word1}", "${word2}", "${word3}". Keep it under 150 words.`;

  document.getElementById("output").innerText = "Glitching...";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_OPENAI_API_KEY"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200
      })
    });

    const data = await response.json();
    const story = data.choices[0].message.content;
    document.getElementById("output").innerText = story;
  } catch (error) {
    document.getElementById("output").innerText = "Error: " + error.message;
  }
}

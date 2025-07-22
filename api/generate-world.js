export default async function handler(req, res) {
  const { word1, word2, word3 } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }
  if (!word1 || !word2 || !word3) {
    return res.status(400).json({ message: "Missing words" });
  }

  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return res.status(500).json({ message: "API key not set" });
  }

  try {
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "user",
          content: `Write a short creative glitchy story using these words: ${word1}, ${word2}, ${word3}.`
        }],
        max_tokens: 200,
      }),
    });
    const json = await completion.json();
    const story = json.choices?.[0]?.message?.content || "No story";
    res.json({ story });
  } catch (e) {
    console.error("OpenAI error:", e);
    res.status(500).json({ message: "Failed to generate story" });
  }
}

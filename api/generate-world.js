export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { word1, word2, word3 } = req.body;

  if (!word1 || !word2 || !word3) {
    return res.status(400).json({ error: 'Missing input words' });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content: `Create a short sci-fi or fantasy story world based on these 3 words: "${word1}", "${word2}", and "${word3}".`
          }
        ],
        temperature: 0.8,
        max_tokens: 400
      })
    });

    const data = await response.json();

    const message = data.choices?.[0]?.message?.content || "Error: no content generated";
    res.status(200).json({ result: message });

  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

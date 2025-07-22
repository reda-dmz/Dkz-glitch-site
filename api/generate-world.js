export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { word1, word2, word3 } = req.body;

  if (!word1 || !word2 || !word3) {
    return res.status(400).json({ message: "Missing words" });
  }

  // Simple mock story generation (replace with real OpenAI call later)
  const story = `In a glitchy world of ${word1}, ${word2}, and ${word3}, a strange tale unfolds...`;

  return res.status(200).json({ story });
}

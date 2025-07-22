console.log("API KEY:", process.env.OPENAI_API_KEY ? "Loaded ✅" : "Missing ❌");
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { word1, word2, word3 } = req.body;

  if (!word1 || !word2 || !word3) {
    return res.status(400).json({ message: "Missing input words" });
  }

  try {
    const prompt = `Write a creative short story inspired by these three random words: ${word1}, ${word2}, and ${word3}. Make it glitchy, surreal, and weird.`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o",
    });

    const story = completion.choices[0].message.content;

    res.status(200).json({ story });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ message: "Failed to generate story" });
  }
}

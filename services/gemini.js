import { GoogleGenAI } from "@google/genai";

export async function generateDailyLesson(usedWords = []) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const prompt = `
Generate Marathi lesson in STRICT JSON.

Rules:
- Avoid these words: ${usedWords.slice(0, 50).join(",")}
- Include:
  - 10 words
  - 10 phrases
  - 1 dialogue
- Add types: basic, opposite, homophone

Format:
{
 "title": "Daily Marathi Lesson",
 "words": [{ "marathi":"", "hindi":"", "english":"", "type":"", "relatedTo":[] }],
 "phrases": [{ "marathi":"", "hindi":"", "english":"" }],
 "dialogue": [{ "speaker":"A","marathi":"","hindi":"","english":"" }]
}
`;

  try {
    const res = await ai.responses.generate({
      model: "gemini-1.5-flash",
      input: prompt,
    });

    let text = res.output[0].content[0].text;

    text = text.replace(/```json|```/g, "").trim();

    return JSON.parse(text);
  } catch (err) {
    console.log("⚠️ AI FAILED → fallback");

    return {
      title: "Daily Marathi Lesson",
      words: [
        { marathi: "पाणी", hindi: "पानी", english: "Water", type: "basic" }
      ],
      phrases: [
        { marathi: "तुम्ही कसे आहात?", hindi: "आप कैसे हैं?", english: "How are you?" }
      ],
      dialogue: [
        {
          speaker: "A",
          marathi: "नमस्कार",
          hindi: "नमस्ते",
          english: "Hello"
        }
      ]
    };
  }
}
import Lesson from "../models/Lesson.js";
import Vocab from "../models/Vocab.js";
import { generateDailyLesson } from "./gemini.js";

function getDayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now - start) / (1000 * 60 * 60 * 24));
}

export async function getTodayLesson() {
  const dayNumber = getDayOfYear();

  let lesson = await Lesson.findOne({ dayNumber });
  if (lesson) return lesson;

  const used = await Vocab.find({}, "marathi");
  const usedWords = used.map((v) => v.marathi);

  const generated = await generateDailyLesson(usedWords);

  // Remove duplicates
  const filteredWords = generated.words.filter(
    (w) => !usedWords.includes(w.marathi)
  );

  lesson = await Lesson.create({
    dayNumber,
    ...generated,
    words: filteredWords,
  });

  // Save vocab
  for (const w of filteredWords) {
    try {
      await Vocab.create(w);
    } catch {}
  }

  return lesson;
}
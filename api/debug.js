import { connectDB } from "../lib/db.js";
import { generateDailyLesson } from "../services/gemini.js";
import { getTodayLesson } from "../services/lesson.js";
import { sendLessonEmail } from "../services/mailer.js";

export default async function handler(req, res) {
  try {
    await connectDB();

    const ai = await generateDailyLesson([]);
    const lesson = await getTodayLesson();

    // 👉 Only send mail if ?send=true
    if (req.query.send === "true") {
      await sendLessonEmail(lesson);
    }

    res.json({
      success: true,
      ai,
      lesson,
      mail: req.query.send === "true" ? "sent" : "skipped",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}
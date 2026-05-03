import { connectDB } from "../lib/db.js";
import { getTodayLesson } from "../services/lesson.js";
import { sendLessonEmail } from "../services/mailer.js";

export default async function handler(req, res) {
  try {
    await connectDB();

    const lesson = await getTodayLesson();

    await sendLessonEmail(lesson);

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
import mongoose from "mongoose";

const WordSchema = new mongoose.Schema({
  marathi: String,
  hindi: String,
  english: String,
  type: String,
  relatedTo: [String],
});

const DialogueSchema = new mongoose.Schema({
  speaker: String,
  marathi: String,
  hindi: String,
  english: String,
});

const LessonSchema = new mongoose.Schema({
  dayNumber: { type: Number, unique: true },
  title: String,
  words: [WordSchema],
  phrases: [WordSchema],
  dialogue: [DialogueSchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Lesson ||
  mongoose.model("Lesson", LessonSchema);
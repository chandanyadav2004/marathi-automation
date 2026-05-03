import mongoose from "mongoose";

const VocabSchema = new mongoose.Schema({
  marathi: { type: String, unique: true },
  hindi: String,
  english: String,
  type: String,
  relatedTo: [String],
});

export default mongoose.models.Vocab ||
  mongoose.model("Vocab", VocabSchema);
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const answerSchema = mongoose.Schema({
  _id: { type: String, default: uuidv4, required: true },
  answer_text: { type: String, required: true },
  date: { type: Date, default: Date.now },
  gained_likes: { type: Number, default: 0 },
  question_id: {
    type: String,
    required: true,
  },
  userName: { type: String, required: true },
});

const AnswerModel = mongoose.model("Answer", answerSchema);

export default AnswerModel;

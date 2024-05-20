import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const questionSchema = mongoose.Schema({
  _id: { type: String, default: uuidv4, required: true },
  user_id: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
  question_text: { type: String, required: true },
});

const QuestionModel = mongoose.model("Question", questionSchema);

export default QuestionModel;

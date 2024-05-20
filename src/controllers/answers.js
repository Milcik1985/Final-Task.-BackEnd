import { v4 as uuidv4 } from "uuid";
import AnswerModel from "../models/answers.js";

const POST_AN_ANSWER = async (req, res) => {
  try {
    const { user_id } = req.user;
    const questionId = req.params.id;
    const { answer_text } = req.body;

    const newAnswer = new AnswerModel({
      _id: uuidv4(),
      question_id: questionId,
      user_id,
      answer_text,
    });

    const savedAnswer = await newAnswer.save();

    res.status(201).json({
      message: "Your Answer Posted Successfully",
      answer: savedAnswer,
    });
  } catch (err) {
    console.log("Handled error:", err);
    res.status(500).json({ message: "Error occured" });
  }
};

export { POST_AN_ANSWER };

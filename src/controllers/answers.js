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

    return res.status(201).json({
      message: "Your Answer Posted Successfully",
      answer: savedAnswer,
    });
  } catch (err) {
    console.log("Handled error:", err);
    return res.status(500).json({ message: "Error occured" });
  }
};

const GET_ALL_ANSWERS = async (req, res) => {
  try {
    console.log("Inside GET_ALL_ANSWERS controller function");

    const questionId = req.params.id;

    console.log("Question id:", questionId);

    const answers = await AnswerModel.find({ question_id: questionId });
    console.log("Retrieved answers:", answers);

    console.log("Retrieved answers:", answers);
    return res.json({ answers: answers });
  } catch (err) {
    console.log("Handled error:", err);
    return res.status(500).json({ message: "Error occured" });
  }
};

const DELETE_AN_ANSWER = async (req, res) => {
  try {
    const answer = await AnswerModel.findByIdAndDelete(req.params.id);

    if (!answer) {
      return res.status(404).json({ message: "Answer does not exist" });
    }

    return res
      .status(200)
      .json({ message: "The Answer Deleted", answer: answer });
  } catch (err) {
    console.log("Handled error:", err);
    return res.status(500).json({ message: "Error occured" });
  }
};

export { POST_AN_ANSWER, GET_ALL_ANSWERS, DELETE_AN_ANSWER };

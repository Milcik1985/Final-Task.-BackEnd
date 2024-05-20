import { v4 as uuidv4 } from "uuid";
import QuestionModel from "../models/questions.js";

const POST_A_QUESTION = async (req, res) => {
  try {
    const { user_id } = req.user;

    if (!user_id) {
      return res.status(401).json({ message: "User is not authorized" });
    }

    const question = new QuestionModel({
      id: uuidv4(),
      user_id,
      question_text: req.body.question_text,
    });
    const savedQuestion = await question.save();
    console.log(question);

    return res
      .status(200)
      .json({ status: "Your Question Is Posted", question: savedQuestion });
  } catch (err) {
    console.log("Handled error:", err);
    return res.status(500).json({ message: "Error occured" });
  }
};

const GET_ALL_QUESTIONS = async (req, res) => {
  try {
    const questions = await QuestionModel.find({ userId: req.body.userId });
    return res.json({ questions: questions });
  } catch (err) {
    console.log("Handled error:", err);
    return res.status(500).json({ message: "Error ocured" });
  }
};

const DELETE_A_QUESTION = async (req, res) => {
  try {
    const question = await QuestionModel.findByIdAndDelete(req.params.id);

    if (!question) {
      return res.status(404).json({ message: "Question does not exist" });
    }

    return res
      .status(200)
      .json({ message: "Question Deleted", question: question });
  } catch (err) {
    console.log("Handled error:", err);
    return res.status(500).json({ message: "Error occured" });
  }
};

export { POST_A_QUESTION, GET_ALL_QUESTIONS, DELETE_A_QUESTION };

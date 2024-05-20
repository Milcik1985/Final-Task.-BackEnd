import Question from "../models/questions.js";
import { v4 as uuidv4 } from "uuid";

const POST_A_QUESTION = async (req, res) => {
  try {
    const { user_id } = req.user;

    const question = new Question({
      id: uuidv4(),
      user_id,
      question_text: req.body.question_text,
    });
    const savedQuestion = await question.save();

    return res
      .status(200)
      .json({ status: "Your Question Is Posted", question: savedQuestion });
  } catch (err) {
    console.log("Handled error:", err);
    return res.status(500).json({ message: "Error occured" });
  }
};

export { POST_A_QUESTION /*GET_ALL_QUESTIONS, DELETE_A_QUESTION*/ };

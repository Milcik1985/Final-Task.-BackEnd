import QuestionModel from "../models/questions.js";

const POST_A_QUESTION = async (req, res) => {
  try {
    console.log("Request user:", req.user);
    const { user_id, userName } = req.user;
    const { question_text } = req.body;

    if (!user_id || !userName) {
      console.log("User ID or username not found in request user");
      return res.status(401).json({ message: "User is not authorized" });
    }

    if (!question_text) {
      console.log("Question text is missing in request body");
      return res.status(400).json({ message: "Question text is required" });
    }

    const question = new QuestionModel({
      user_id,
      userName,
      question_text,
    });

    const savedQuestion = await question.save();
    console.log("Saved question:", savedQuestion);

    return res
      .status(200)
      .json({ status: "Your Question Is Posted", question: savedQuestion });
  } catch (err) {
    console.log("Handled error:", err);
    return res.status(500).json({ message: "Error occurred" });
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

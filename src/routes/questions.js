import express from "express";
import {
  POST_A_QUESTION,
  /*GET_ALL_QUESTIONS,
  DELETE_A_QUESTION,*/
} from "../controllers/questions.js";

const router = express.Router();

router.post("/questions", POST_A_QUESTION);
router.get("/questions", GET_ALL_QUESTIONS);
router.delete("/questions/:id", DELETE_A_QUESTION);

export default router;

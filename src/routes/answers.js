import express from "express";
import {
  POST_AN_ANSWER,
  //   GET_ALL_ANSWERS,
  //   DELETE_AN_ANSWER,
} from "../controllers/answers.js";
import authUser from "../middlewares/auth.js";

const router = express.Router();

router.post("/question/:id/answers", authUser, POST_AN_ANSWER);
// router.get("/question/:id/answers", GET_ALL_ANSWERS);
// router.delete("/answer/:id", authUser, DELETE_AN_ANSWER);

export default router;

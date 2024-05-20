import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import userRouter from "./src/routes/user.js";

const app = express();

app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.Mongo_CONNECTION)
  .then(() => console.log("Connected to DB"))
  .catch((err) => {
    console.log("Error:", err);
  });

app.use(userRouter);

app.use((req, res) => {
  return res.status(404).json({ status: "Endpoint does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log(`APP STARTED ON ${process.env.PORT}`);
});

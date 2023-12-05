import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connection successful");
  } catch (err) {
    console.log("Error connecting to database", err);
  }
};

const port = 8000;
app.listen(port, () => {
  connectDB();
  console.log("Server is running on port", port);
});

import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import conversationRoute from "./routes/conversationRoute.js";
import orderRoute from "./routes/orderRoute.js";
import messageRoute from "./routes/messageRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import gigRoute from "./routes/gigRoute.js";

const app = express();

// For getting env variables
dotenv.config();

// To get data from the user
app.use(express.json());

// To get access to cookies
app.use(cookieParser());

// Database connection function
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connection successful");
  } catch (err) {
    console.log("Error connecting to database", err);
  }
};

// All the api endpoints
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/orders", orderRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/reviews", reviewRoute);

const port = 8000;
app.listen(port, () => {
  connectDB();
  console.log("Server is running on port", port);
});

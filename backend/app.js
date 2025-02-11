import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const PORT = process.env.PORT || 5000;
dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());


app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Task Management API is running...");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
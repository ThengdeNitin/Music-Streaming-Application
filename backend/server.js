import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongoDB.js";
import adminRouter from "./routes/adminRoutes.js";
import path from "path";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ CORS for Vercel
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*", // Allow your frontend Vercel URL
    credentials: true,
  })
);

app.use(express.json());

// ⚠️ Vercel has a read-only filesystem → don't rely on /uploads locally
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

app.use("/api/admin", adminRouter);

// Health check
app.get("/", (req, res) => {
  res.send({
    activateState: true,
    error: false,
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

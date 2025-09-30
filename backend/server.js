import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./config/mongoDB.js";
import adminRouter from "./routes/adminRoutes.js";
import path from 'path';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigin = process.env.VITE_BACKEND_URL || '*'; 
app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));
app.use('/api/admin', adminRouter);

app.get('/', (req, res) => {
  res.send({
    activateState: true,
    error: false,
  });
});

app.listen(PORT, () => {
  console.log(`Server connected to port ${PORT}`);
});

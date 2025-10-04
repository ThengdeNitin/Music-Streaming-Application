import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "music",
    });
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

mongoose.connection.on("error", err => console.error("MongoDB Error:", err));
mongoose.connection.on("disconnected", () => console.log("MongoDB Disconnected"));

export default connectDB;

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

function connectDB() {
  mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("MongoDB connection failed:", err.message);
  }); 
}
export default connectDB;
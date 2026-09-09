import mongoose from "mongoose";

export async function connectDb() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.log("MONGODB_URI not set, API will run without DB connection.");
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected.");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}

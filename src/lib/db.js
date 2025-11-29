import mongoose from "mongoose";

let isConnected = false; // Global connection flag

export const connectDB = async () => {
  if (isConnected) {
    console.log("🟢 MongoDB already connected (cached)");
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("❌ MONGODB_URI not found in environment variables");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = db.connections[0].readyState === 1;

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};

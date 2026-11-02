const mongoose = require("mongoose");

// Serverless (Vercel) safe connection caching.
// প্রতিটি invocation এ নতুন connection না বানিয়ে আগের connection/promise cache করে reuse করি,
// এতে "buffering timed out" error হয় না কারণ প্রতিটা request এ আমরা connection ready হওয়া পর্যন্ত await করি।
let cached = global.__mongoose;
if (!cached) {
  cached = global.__mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // ইতিমধ্যে connected থাকলে সেটাই ফেরত দাও
  if (cached.conn) {
    return cached.conn;
  }

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI is not set in environment variables");
  }

  // connection promise না থাকলে একবার তৈরি করি; একই promise সব request share করবে
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(mongoUri, {
        // serverless এ hang এড়াতে দ্রুত fail করা ভালো
        serverSelectionTimeoutMS: 10000,
        // pool ছোট রাখি — serverless এ অনেক function instance হলে Atlas connection limit শেষ না হয়
        maxPoolSize: 10,
      })
      .then((mongooseInstance) => {
        console.log("✅ MongoDB connected successfully");
        return mongooseInstance.connection;
      })
      .catch((error) => {
        // fail করলে promise reset করি যাতে পরের request আবার চেষ্টা করতে পারে
        cached.promise = null;
        console.error("❌ MongoDB connection error:", error.message);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = connectDB;

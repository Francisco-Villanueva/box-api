import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('MongoDB connected');
  } catch (error) {
    console.log('MongoDB connection failed', error);
    process.exit(1);
  }
};

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to db');
});

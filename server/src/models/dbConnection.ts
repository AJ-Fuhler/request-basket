import mongoose from "mongoose";
import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pgURI = process.env.PG_URI;
if (!pgURI) throw new Error('PG_URI not set in .env');

const pool = new Pool({
    connectionString: pgURI,
});


export async function connectDBs() {
  try {
    await connectMongo();
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
  try {
    await pool.query('SELECT 1'); // Test PostgreSQL connection
    console.log("PostgreSQL connected");
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
  }
}

async function connectMongo() {
  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) throw new Error('MONGO_URI not set in .env');
  await mongoose.connect(mongoURI);

  mongoose.connection.on('error', (e) => console.error('MongoDB error:', e));
  mongoose.connection.on('disconnected', () => console.warn('MongoDB disconnected'));
}

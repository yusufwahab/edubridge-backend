import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // 1. Import the cors package
import { connectDB } from './db.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

// --- Middleware ---
app.use(express.json());

// 2. Add the CORS middleware to allow all origins.
// This must come before your routes to process the request first.
app.use(cors()); 

// --- Routes ---
app.use("/api/user", authRoutes);


// --- Database Connection and Server Start ---
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

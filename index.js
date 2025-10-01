import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './db.js';
dotenv.config();
import authRoutes from './routes/auth.js';



const PORT = process.env.PORT || 5000;

const app = express()

app.use(express.json());

app.use("/api/user", authRoutes)

// app.get('/', (req, res) => {
//   res.send('Hello from Node API server cleaned!')
// });

connectDB();

 app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
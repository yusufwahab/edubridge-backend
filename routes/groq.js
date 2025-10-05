// routes/groq.js
import express from "express";
import fetch from "node-fetch";
import { protect } from "../middleware/auth.js"; // optional: only allow logged-in users

const router = express.Router();

router.post("/groq", protect, async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages) {
      return res.status(400).json({ error: "Messages are required" });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", // or whichever Groq model you prefer
        messages,
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Groq API error:", error.message);
    res.status(500).json({ error: "Failed to fetch response from Groq" });
  }
});

export default router;

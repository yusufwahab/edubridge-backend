// routes/groq.js
import express from "express";
import { protect } from "../middleware/auth.js"; // optional: only allow logged-in users

const router = express.Router();

// Best practice: no "/api" prefix here
router.get("/key", protect, async (req, res) => {
  try {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "API key not found in environment variables" });
    }

    // ❌ No masking – return the full key (use with caution!)
    res.json({ key: apiKey });

  } catch (err) {
    console.error("Error fetching GROQ API key:", err);
    res.status(500).json({ error: "Server error fetching API key" });
  }
});

export default router;


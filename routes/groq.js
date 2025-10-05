// routes/groq.js
import express from "express";
 // optional: only allow logged-in users

const router = express.Router();

// ✅ best practice: route path should be relative (no "/api" prefix here)
router.get("/key", async (req, res) => {
  try {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "API key not found in environment variables" });
    }

    // ✅ mask all but the last 4 characters
    const maskedKey = apiKey.replace(/.(?=.{4})/g, "*");

    res.json({ key: maskedKey });
  } catch (err) {
    console.error("Error fetching GROQ API key:", err);
    res.status(500).json({ error: "Server error fetching API key" });
  }
});

export default router;

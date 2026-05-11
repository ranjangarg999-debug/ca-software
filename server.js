const express = require("express");
const cors = require("cors");
const multer = require("multer"); // File upload ke liye
const { GoogleGenerativeAI } = require("@google/generative-ai"); // AI ke liye

const app = express();
const upload = multer({ storage: multer.memoryStorage() }); // Memory mein file save karega

app.use(cors());
app.use(express.json());

// Railway se API Key uthayega
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/", (req, res) => {
  res.status(200).send("CA AI Backend Running");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// --- ASLI AI LOGIC YAHAN HAI ---
app.post("/analyze", upload.single("bill"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("File nahi mili.");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = "Tum ek Indian CA ho. Is bill se Vendor Name, GSTIN, Date, aur Total Amount nikaal kar JSON mein do.";

    const imagePart = {
      inlineData: {
        data: req.file.buffer.toString("base64"),
        mimeType: req.file.mimetype,
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    res.json({ success: true, analysis: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  server.close(() => {
    console.log("Server closed");
  });
});

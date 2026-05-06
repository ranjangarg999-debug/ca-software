const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

//  Root route (important)
app.get("/", (req, res) => {
  res.send("Backend Running ");
});

//  API route
app.post("/generate", (req, res) => {
  const { niche, offer } = req.body;

  const result = `Hi, I help ${niche} businesses with ${offer}.`;

  res.json({ result });
});

//  PORT (Railway compatible)
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});

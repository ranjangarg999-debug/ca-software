const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/generate", (req, res) => {
  const { niche, offer } = req.body;

  const result = `Hi, I help ${niche} businesses with ${offer}.`;

  res.json({ result });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
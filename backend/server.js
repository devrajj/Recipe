const express = require("express");
const OpenAI = require("openai");
require("dotenv").config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const app = express();
const PORT = process.env.PORT || 3000;
app.get("/", async (req, res) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: "Only Say Hello!",
      },
    ],
  });
  res.send({ ok: true, data: response.choices[0].message.content });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

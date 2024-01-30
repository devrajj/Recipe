const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = {
  createPrompt: async ({ userPrompt }) => {
    try {
      const data = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that provides recipes.",
          },
          {
            role: "user",
            content: `Give me the recipe for ${userPrompt}`,
          },
        ],
      });
      return {
        ok: true,
        data: data.choices[0].message.content,
      };
    } catch (err) {
      console.error("Error in createPrompt:", err.stack);
      return { ok: false, err: err.stack };
    }
  },
};

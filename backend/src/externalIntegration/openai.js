const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = {
  createPrompt: async () => {
    try {
      const data = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: "Only Say Hello!",
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

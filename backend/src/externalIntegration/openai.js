const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateImage = async ({ recipeText }) => {
  try {
    // we can change the models and other options of image generation from here
    const data = await openai.images.generate({
      model: "dall-e-2",
      prompt: recipeText,
      n: 1,
      quality: "standard",
      response_format: "url",
    });
    return data.data[0].url;
  } catch (err) {
    console.error("err:", err.stack);
    return "";
  }
};

module.exports = {
  createPrompt: async ({ userPrompt }) => {
    try {
      // we can change the models and other options of completions from here
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
      const text = data.choices[0].message.content;
      const recipeText = data.choices[0].message.content.trim().slice(0, 1000);
      const file = await generateImage({ recipeText });
      return {
        ok: true,
        data: {
          text,
          file,
        },
      };
    } catch (err) {
      console.error("Error in createPrompt:", err.stack);
      return { ok: false, err: err.stack };
    }
  },
};

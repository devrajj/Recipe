const OpenAI = require("openai");

class RecipeAssistant {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  async generateImage({ userPrompt }) {
    try {
      // we can change the models and other options of image generation from here
      const data = await this.openai.images.generate({
        model: "dall-e-2",
        prompt: `Give me image for recipe for ${userPrompt}`,
        n: 1,
        quality: "standard",
        response_format: "url",
      });
      return data.data[0]?.url || "";
    } catch (err) {
      console.error("Error in generateImage:", err.stack);
      return "";
    }
  }

  async generateCompletion({ userPrompt }) {
    try {
      // we can change the models and other options of image generation from here
      const data = await this.openai.chat.completions.create({
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
      return (
        data.choices[0]?.message.content ||
        `Sorry cannot find recipe for ${userPrompt}`
      );
    } catch (err) {
      console.error("Error in generateCompletion:", err.stack);
      return `Sorry cannot find recipe for ${userPrompt}`;
    }
  }

  async createPrompt({ userPrompt }) {
    try {
      // we can change the models and other options of completions from here
      const [completionData, imageData] = await Promise.allSettled([
        this.generateCompletion({ userPrompt }),
        this.generateImage({ userPrompt }),
      ]);
      return {
        ok: true,
        data: {
          text: completionData.value,
          file: imageData.value,
        },
      };
    } catch (err) {
      console.error("Error in createPrompt:", err.stack);
      return { ok: false, err: err.stack };
    }
  }
}

module.exports = RecipeAssistant;

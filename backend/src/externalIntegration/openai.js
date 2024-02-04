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
        model: "dall-e-3",
        prompt: `Give me image for recipe for ${userPrompt}. If not a recipe then return the url of file as null`,
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
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `Act as an AI recipe assistant that provides recipes of real and made up dishes across the globe asked by a user. 
            Now if it is a real dish or a made up dish generate recipe and ingredients for that dish but if the question is 
            not related to food then give the response as Sorry cannot provide recipe for the dish that you provided always in this case. `,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
        temperature: 0.7,
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
        text: completionData.value,
        file: imageData.value,
      };
    } catch (err) {
      console.error("Error in createPrompt:", err.stack);
      return { text: "", file: "" };
    }
  }
}

module.exports = RecipeAssistant;

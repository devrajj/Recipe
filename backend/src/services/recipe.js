const RecipeAssistant = require("../externalIntegration/openai");
const generatedRecipesModel = require("../models/generatedRecipes");

async function storeGeneratedRecipes({ recipeData, question, userId }) {
  await generatedRecipesModel.create({
    insertDict: {
      question,
      recipeText: recipeData.text,
      recipeFile: recipeData.file,
      user: userId,
    },
  });
}

module.exports = {
  getRecipes: async ({ userPrompt, userId }) => {
    try {
      const recipeAssistant = new RecipeAssistant();
      const data = await recipeAssistant.createPrompt({ userPrompt });
      if (data.ok && data.data) {
        await storeGeneratedRecipes({
          recipeData: data.data,
          question: userPrompt,
          userId,
        });
      }
      return data;
    } catch (err) {
      console.error("Error in getRecipes recipe:", err.stack);
      return { ok: false, err: err.stack };
    }
  },

  getChatbotHistory: async ({ userId }) => {
    try {
      return {
        ok: true,
        data: {
          text: "",
          file: "",
        },
      };
    } catch (err) {
      console.error("Error in getChatbotHistory recipe:", err.stack);
      return { ok: false, err: err.stack };
    }
  },
};

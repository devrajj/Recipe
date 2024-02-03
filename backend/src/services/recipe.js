const RecipeAssistant = require("../externalIntegration/openai");

module.exports = {
  getRecipes: async ({ userPrompt }) => {
    try {
      const recipeAssistant = new RecipeAssistant();
      const data = await recipeAssistant.createPrompt({ userPrompt });
      return data;
    } catch (err) {
      console.error("Error in getRecipes:", err.stack);
      return { ok: false, err: err.stack };
    }
  },
};

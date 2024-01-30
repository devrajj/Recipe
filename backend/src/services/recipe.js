const { createPrompt } = require("../externalIntegration/openai");

module.exports = {
  getRecipes: async ({ userPrompt }) => {
    const data = await createPrompt({ userPrompt });
    return data;
  },
};

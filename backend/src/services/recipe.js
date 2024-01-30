const { createPrompt } = require("../externalIntegration/openai");

module.exports = {
  getRecipes: async () => {
    const data = await createPrompt();
    return data;
  },
};

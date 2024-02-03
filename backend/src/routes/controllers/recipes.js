const recipeService = require("../../services/recipe");

module.exports = {
  getRecipes: async (req, res) => {
    try {
      const userId = req.user.userId;
      if (!userId) {
        return res.invalid({ msg: "Invalid User" });
      }
      const { userPrompt } = req.body;
      if (!userPrompt) {
        return res.invalid({ msg: "Please ask for a recipe" });
      }
      const response = await recipeService.getRecipes({ userPrompt, userId });
      if (response.ok) {
        return res.success({ data: response.data });
      }
      return res.failure({ msg: response.err });
    } catch (err) {
      console.error("error in getRecipes:", err.stack);
      return res.failure({ msg: err.stack });
    }
  },

  getChatbotHistory: async (req, res) => {
    try {
      const { userPrompt, userId } = req.body;
      if (!userPrompt) {
        return res.invalid({ msg: "Please ask for a recipe" });
      }
      const response = await recipeService.getChatbotHistory({
        userPrompt,
        userId,
      });
      if (response.ok) {
        return res.success({ data: response.data });
      }
      return res.failure({ msg: response.err });
    } catch (err) {
      console.error("error in getChatbotHistory:", err.stack);
      return res.failure({ msg: err.stack });
    }
  },
};

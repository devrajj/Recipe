const recipeService = require("../../services/recipe");

module.exports = {
  getRecipes: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { userPrompt } = req.body;
      if (!userId) {
        return res.invalid({ msg: "Invalid User" });
      }
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
      const userId = req.user.userId;
      const { pageNumber = 0, pageLength = 200 } = req.query;
      if (!userId) {
        return res.invalid({ msg: "Invalid User" });
      }
      if (pageLength < 0) {
        return res.invalid({ msg: "Invalid Page Length" });
      }
      if (pageNumber < 1) {
        return res.invalid({ msg: "Invalid Page Number" });
      }
      const response = await recipeService.getChatbotHistory({
        userId,
        pageNumber: parseInt(pageNumber, 10),
        pageLength: parseInt(pageLength, 10),
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

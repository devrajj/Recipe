const recipeService = require("../../services/recipe");

module.exports = {
  getRecipes: async (req, res) => {
    try {
      const { userPrompt } = req.body;
      if (!userPrompt) {
        return res.invalid({ msg: "Please ask for a recipe" });
      }
      const response = await recipeService.getRecipes({ userPrompt });
      if (response.ok) {
        return res.success({ data: response.data });
      }
      return res.failure({ msg: response.err });
    } catch (err) {
      console.error("error in getRecipes:", err.stack);
      return res.failure({ msg: err.stack });
    }
  },
};

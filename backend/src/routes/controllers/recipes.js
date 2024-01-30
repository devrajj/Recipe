const recipeService = require("../../services/recipe");

module.exports = {
  getRecipes: async (req, res) => {
    try {
      const response = await recipeService.getRecipes();
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

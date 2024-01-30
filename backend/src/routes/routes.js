const router = require("express").Router();
const recipeController = require("../../src/routes/controllers/recipes");

// Health Check
router.get("/healthz", (_req, res) => res.json({ status: "success" }));

// Get Recipes
router.get("/get-recipes", recipeController.getRecipes);

module.exports = router;

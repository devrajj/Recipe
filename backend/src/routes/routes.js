const router = require("express").Router();
const recipeController = require("../../src/routes/controllers/recipes");
const userController = require("../../src/routes/controllers/user");
const favouriteController = require("../../src/routes/controllers/favourite");
const authenticateJwtToken = require("../routes/middlewares/auth");

// Health Check
router.get("/healthz", (_req, res) => res.json({ status: "success" }));

// Login
router.post("/login", userController.loginUser);

// Signup
router.post("/signup", userController.signupUser);

// Get Recipes
router.post("/get-recipes", authenticateJwtToken, recipeController.getRecipes);

// Mark as Favourite
router.post("/get-recipes", authenticateJwtToken, recipeController.getRecipes);

// Fetch Favourites
router.get(
  "/get-favourite",
  authenticateJwtToken,
  favouriteController.fetchFavouriteListForUser
);

// Fetch Recipe Chat
router.get(
  "/get-recipechat-history",
  authenticateJwtToken,
  recipeController.getChatbotHistory
);

module.exports = router;

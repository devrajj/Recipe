const favouriteModel = require("../models/favourites");

module.exports = {
  fetchFavouriteListForUser: async ({ userId }) => {
    try {
      return {
        ok: true,
        data: {
          text: "",
          file: "",
        },
      };
    } catch (err) {
      console.error("Error in fetchFavouriteListForUser service:", err.stack);
      return { ok: false, err: err.stack };
    }
  },

  markAsFavourite: async ({ userId, recipeId }) => {
    try {
      await favouriteModel.create({
        insertDict: {
          user: userId,
          recipe: recipeId,
        },
      });
      return {
        ok: true,
        data: "Successfully marked as favourite",
      };
    } catch (err) {
      console.error("Error in markAsFavourite service:", err.stack);
      return { ok: false, err: err.stack };
    }
  },
};

const favouriteModel = require("../models/favourites");
const generatedRecipeModel = require("../models/generatedRecipes");

module.exports = {
  fetchFavouriteListForUser: async ({ userId, pageNumber, pageLength }) => {
    const offset = (pageNumber - 1) * pageLength;
    let favouriteList = await favouriteModel.fetchFavouriteListForUser({
      userId,
      offset,
      pageLength,
    });
    try {
      return {
        ok: true,
        data: {
          favouriteList,
          pageNumber,
        },
      };
    } catch (err) {
      console.error("Error in fetchFavouriteListForUser service:", err.stack);
      return { ok: false, err: err.stack };
    }
  },

  markAsFavourite: async ({ userId, recipeId }) => {
    try {
      const [favouriteItem, recipeItem] = await Promise.all([
        favouriteModel.findOne({
          query: {
            user: userId,
            recipe: recipeId,
          },
        }),
        generatedRecipeModel.findOne({
          query: {
            _id: recipeId,
          },
        }),
      ]);
      if (favouriteItem && Object.keys(favouriteItem).length) {
        return {
          ok: false,
          err: "Already marked as favourite",
        };
      }
      if (!recipeItem || !Object.keys(recipeItem).length) {
        return {
          ok: false,
          err: "Recipe not found",
        };
      }
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

  markAsUnFavourite: async ({ userId, recipeId }) => {
    try {
      const favouriteItem = await favouriteModel.findOne({
        query: {
          user: userId,
          recipe: recipeId,
        },
      });
      if (!favouriteItem || !Object.keys(favouriteItem).length) {
        return {
          ok: false,
          err: "Already marked as unfavourite",
        };
      }
      await favouriteModel.deleteOne({
        query: {
          user: userId,
          recipe: recipeId,
        },
      });
      return {
        ok: true,
        data: "Successfully unmarked as favourite",
      };
    } catch (err) {
      console.error("Error in markAsUnFavourite service:", err.stack);
      return { ok: false, err: err.stack };
    }
  },
};

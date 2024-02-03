const favouriteService = require("../../services/favourite");

module.exports = {
  fetchFavouriteListForUser: async (req, res) => {
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
      const response = await favouriteService.fetchFavouriteListForUser({
        userId,
        pageNumber: parseInt(pageNumber, 10),
        pageLength: parseInt(pageLength, 10),
      });
      if (response.ok) {
        return res.success({ data: response.data });
      }
      return res.failure({ msg: response.err });
    } catch (err) {
      console.error("error in fetchFavouriteListForUser:", err.stack);
      return res.failure({ msg: err.stack });
    }
  },

  markAsFavourite: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { recipeId } = req.body;
      if (!userId) {
        return res.invalid({ msg: "Invalid User" });
      }
      if (!recipeId) {
        return res.invalid({ msg: "recipeId is required" });
      }
      const response = await favouriteService.markAsFavourite({
        userId,
        recipeId,
      });
      if (response.ok) {
        return res.success({ data: response.data });
      }
      return res.failure({ msg: response.err });
    } catch (err) {
      console.error("error in markAsFavourite:", err.stack);
      return res.failure({ msg: err.stack });
    }
  },

  markAsUnFavourite: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { recipeId } = req.body;
      if (!userId) {
        return res.invalid({ msg: "Invalid User" });
      }
      if (!recipeId) {
        return res.invalid({ msg: "recipeId is required" });
      }
      const response = await favouriteService.markAsUnFavourite({
        userId,
        recipeId,
      });
      if (response.ok) {
        return res.success({ data: response.data });
      }
      return res.failure({ msg: response.err });
    } catch (err) {
      console.error("error in markAsUnFavourite:", err.stack);
      return res.failure({ msg: err.stack });
    }
  },
};

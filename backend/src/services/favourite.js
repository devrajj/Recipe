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
      console.error("Error in fetchFavouriteListForUser:", err.stack);
      return { ok: false, err: err.stack };
    }
  },
};

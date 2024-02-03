const favouriteService = require("../../services/favourite");

module.exports = {
  fetchFavouriteListForUser: async (req, res) => {
    try {
      const { userId } = req.body;
      const response = await favouriteService.fetchFavouriteListForUser({
        userId,
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
};

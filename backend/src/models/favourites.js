const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "generatedRecipes",
      required: true,
    },
  },
  { timestamps: true }
);

favouriteSchema.index({ user: 1, recipe: 1 }, { unique: true });

const favouriteModel = mongoose.model(
  "favourite",
  favouriteSchema,
  "favourite"
);

module.exports = {
  create: async ({ insertDict }) => new favouriteModel(insertDict).save(),
  findOne: async ({ query, projection }) =>
    favouriteModel.findOne(query, projection).lean(),
  find: async ({ query, projection }) =>
    favouriteModel.find(query, projection).lean(),
  updateOne: ({ query, updateDict }) =>
    favouriteModel.updateOne(query, updateDict),
  update: async ({ query, updateDict }) =>
    favouriteModel.updateMany(query, updateDict),
};

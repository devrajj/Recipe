const mongoose = require("mongoose");

const generatedRecipeSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    recipeText: { type: String, required: true },
    recipeFile: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  },
  { timestamps: true }
);

generatedRecipeSchema.index({ user: 1 });

const generatedRecipesModel = mongoose.model(
  "generatedrecipes",
  generatedRecipeSchema,
  "generatedrecipes"
);

module.exports = {
  generatedRecipesModel,
  create: async ({ insertDict }) =>
    new generatedRecipesModel(insertDict).save(),
  findOne: async ({ query, projection }) =>
    generatedRecipesModel.findOne(query, projection).lean(),
  find: async ({ query, projection }) =>
    generatedRecipesModel.find(query, projection).lean(),
  updateOne: ({ query, updateDict }) =>
    generatedRecipesModel.updateOne(query, updateDict),
  update: async ({ query, updateDict }) =>
    generatedRecipesModel.updateMany(query, updateDict),
  fetchGeneratedRecipesForUser: async ({ userId, offset, pageLength }) =>
    generatedRecipesModel.aggregate([
      { $match: { user: userId } },
      {
        $skip: offset,
      },
      {
        $limit: pageLength,
      },
      {
        $lookup: {
          from: "favourite",
          localField: "_id",
          foreignField: "recipe",
          as: "favourite",
        },
      },
      {
        $project: {
          _id: 1,
          question: 1,
          recipeText: 1,
          recipeFile: 1,
          isFavourite: {
            $cond: {
              if: {
                $gt: [{ $size: "$favourite" }, 0],
              },
              then: true,
              else: false,
            },
          },
        },
      },
    ]),
};

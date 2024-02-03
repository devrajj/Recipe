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
};

const RecipeAssistant = require("../externalIntegration/openai");
const generatedRecipesModel = require("../models/generatedRecipes");

async function storeGeneratedRecipes({ text, file, question, userId }) {
  const createdDocument = await generatedRecipesModel.create({
    insertDict: {
      question,
      recipeText: text,
      recipeFile: file,
      user: userId,
    },
  });
  const createdDocumentId = createdDocument._id;
  return createdDocumentId;
}

module.exports = {
  getRecipes: async ({ userPrompt, userId }) => {
    try {
      const recipeAssistant = new RecipeAssistant();
      const data = await recipeAssistant.createPrompt({ userPrompt });
      if (data.text) {
        const createdDocumentId = await storeGeneratedRecipes({
          question: userPrompt,
          userId,
          text: data.text,
          file: data.file,
        });
        return {
          ok: true,
          data: {
            _id: createdDocumentId,
            question: userPrompt,
            recipeText: data.text,
            recipeFile: data.file,
            isFavourite: false,
          },
        };
      }
      return {
        ok: false,
        err: data.err,
      };
    } catch (err) {
      console.error("Error in getRecipes recipe:", err.stack);
      return { ok: false, err: err.stack };
    }
  },

  getChatbotHistory: async ({ userId, pageNumber, pageLength }) => {
    try {
      const offset = (pageNumber - 1) * pageLength;
      let recipeList = await generatedRecipesModel.fetchGeneratedRecipesForUser(
        {
          userId,
          offset,
          pageLength,
        }
      );
      return {
        ok: true,
        data: {
          recipeList,
          pageNumber,
        },
      };
    } catch (err) {
      console.error("Error in getChatbotHistory recipe:", err.stack);
      return { ok: false, err: err.stack };
    }
  },
};

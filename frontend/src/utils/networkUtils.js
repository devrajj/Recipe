import axios from "axios";

const chatBotApi = axios.create({
  baseURL: process.env.REACT_APP_CHATBOT_API_URL,
});

export const getChatBotApi = (url, data, config) =>
  chatBotApi.post(url, data, config);

// replace this with the original endpoint once integrating; currently, it is a dummy response
export const getRecipeInfo = ({ userPrompt }) =>
  getChatBotApi("/get-recipes", { userPrompt });

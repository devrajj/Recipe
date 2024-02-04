import axios from "axios";

const chatBotApi = axios.create({
  baseURL: process.env.REACT_APP_CHATBOT_API_URL,
});

const getHeaders = () => ({
  Authorization: localStorage.getItem("jwtToken"),
});
const getChatBotApi = ({ url, params, config = {} }) => {
  config.headers = { ...getHeaders(), ...config.headers };
  return chatBotApi.get(url, { params, ...config });
};

const requestWithMethod = (method) => (url, data, config) =>
  chatBotApi[method](url, data, {
    headers: { ...getHeaders(), ...config?.headers },
  });

export const postChatBotApi = requestWithMethod("post");
export const putChatBotApi = requestWithMethod("put");

export const getRecipeInfo = ({ userPrompt }) =>
  postChatBotApi("/get-recipes", { userPrompt });

export const signupUser = ({ username, password, email }) =>
  postChatBotApi("/signup", { username, password, email });

export const loginUser = ({ email, password }) =>
  postChatBotApi("/login", { email, password });

export const markAsFavourite = ({ recipeId }) =>
  postChatBotApi("/mark-as-favourite", { recipeId });

export const markAsUnFavourite = ({ recipeId }) =>
  putChatBotApi("/mark-as-unfavourite", { recipeId });

export const getFavouriteList = ({ pageNumber, pageLength }) =>
  getChatBotApi({ url: "/get-favourite", params: { pageNumber, pageLength } });

export const getChatHistory = ({ pageNumber, pageLength }) =>
  getChatBotApi({
    url: "/get-recipechat-history",
    params: { pageNumber, pageLength },
  });

export const logoutUser = () => putChatBotApi("/logout");

import axios from "axios";

// const chatBotApi = create({
//   baseUrl: process.env.CHATBOT_API_URL,
// });

const mockyApi = axios.create({
  baseURL: "https://run.mocky.io",
});

export const getMocky = (url, params, config) =>
  mockyApi.get(url, params, config);

// replace this with the original endpoint once integrating; currently, it is a dummy response
export const getRecipeInfo = () =>
  getMocky("/v3/9e5a1555-5aaa-4658-965d-eb9e9709cc88");

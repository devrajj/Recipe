const express = require("express");
require("dotenv").config();
const routes = require("../src/routes/routes");
const reponseHandlers = require("../src/routes/middlewares/response");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(reponseHandlers);
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require("express");
const bodyParser = require("body-parser");
require("../src/models/db");
require("dotenv").config();
const routes = require("../src/routes/routes");
const reponseHandlers = require("../src/routes/middlewares/response");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(reponseHandlers);
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

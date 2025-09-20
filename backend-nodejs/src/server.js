import express from "express";
import bodyParser from "body-parser";
require("dotenv").config();
import configViewEngine from "./config/viewEngine";
import intiWebRoutes from "./routers/web";

const app = express();
const PORT = process.env.PORT || 8080;

// config viewEngine
configViewEngine(app);

// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config router
intiWebRoutes(app);

app.listen(PORT, () => {
  console.log("Server is running on the port " + PORT);
});

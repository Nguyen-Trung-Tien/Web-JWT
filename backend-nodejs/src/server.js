import express from "express";
require("dotenv").config();
import configViewEngine from "./config/viewEngine";
import intiWebRoutes from "./routers/web";

const app = express();
const PORT = process.env.PORT || 8080;

configViewEngine(app);
intiWebRoutes(app);

app.listen(PORT, () => {
  console.log("Server is running on the port " + PORT);
});

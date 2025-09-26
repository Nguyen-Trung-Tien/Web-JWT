import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
require("dotenv").config();
import configViewEngine from "./config/viewEngine";
import intiWebRoutes from "./routers/web";
import intiApiRoutes from "./routers/api";

import connection from "./config/connectDb";

const app = express();
const PORT = process.env.PORT || 8080;
// cors
app.use(
  cors({
    origin: process.env.REACT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// config viewEngine
configViewEngine(app);

// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// get connection
connection();

// config router
intiWebRoutes(app);

intiApiRoutes(app);
app.listen(PORT, () => {
  console.log("Server is running on the port " + PORT);
});

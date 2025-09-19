import express from "express";
import homController, { handleHelloWorld } from "../controller/homeController";
const router = express.Router();

const intiWebRoutes = (app) => {
  router.get("/", homController.handleHelloWorld);

  router.get("/user", homController.handleUserPage);

  return app.use("/", router);
};

export default intiWebRoutes;

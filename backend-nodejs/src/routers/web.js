import express from "express";
import homController, { handleHelloWorld } from "../controller/homeController";
const router = express.Router();

const intiWebRoutes = (app) => {
  router.get("/", homController.handleHelloWorld);
  router.get("/user", homController.handleUserPage);
  router.post("/user/create-user", homController.handleCreateNewUser);

  return app.use("/", router);
};

export default intiWebRoutes;

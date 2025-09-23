import express from "express";
import homController from "../controller/homeController";
const router = express.Router();

const intiWebRoutes = (app) => {
  router.get("/", homController.handleHelloWorld);
  router.get("/user", homController.handleUserPage);
  router.post("/user/create-user", homController.handleCreateNewUser);
  router.post("/delete-user/:id", homController.handleDeleteUser);
  router.get("/user-update/:id", homController.getUserById);
  router.post("/user/user-update", homController.handleUpdateUser);

  return app.use("/", router);
};

export default intiWebRoutes;

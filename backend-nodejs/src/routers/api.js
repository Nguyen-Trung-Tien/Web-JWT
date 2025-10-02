import express from "express";
import apiController from "../controller/apiController";
import userController from "../controller/userController";

const router = express.Router();

const intiApiRoutes = (app) => {
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);

  router.get("/user/show", userController.handleShowUser);
  router.post("/user/create", userController.handleCreateUser);
  router.put("/user/update", userController.handleUpdateUser);
  router.delete("/user/delete", userController.handleDeleteUser);
  return app.use("/api/v1", router);
};

export default intiApiRoutes;

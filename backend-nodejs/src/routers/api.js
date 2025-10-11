import express from "express";
import apiController from "../controller/apiController";
import userController from "../controller/userController";
import groupController from "../controller/groupController";
import { checkUserJWT, checkUserPermission } from "../middleware/JWT-Action";

const router = express.Router();

const intiApiRoutes = (app) => {
  router.all("*", checkUserJWT, checkUserPermission);
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);
  router.post("/logout", apiController.handleLogout);

  router.get("/account", userController.handleGetUserAccount);
  router.get("/user/show", userController.handleShowUser);
  router.post("/user/create", userController.handleCreateUser);
  router.put("/user/update", userController.handleUpdateUser);
  router.delete("/user/delete", userController.handleDeleteUser);

  router.get("/group/show", groupController.handleShowGroup);

  return app.use("/api/v1", router);
};

export default intiApiRoutes;

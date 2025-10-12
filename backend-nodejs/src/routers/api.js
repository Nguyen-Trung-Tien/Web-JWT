import express from "express";
import apiController from "../controller/apiController";
import userController from "../controller/userController";
import groupController from "../controller/groupController";
import roleController from "../controller/roleController";
import { checkUserJWT, checkUserPermission } from "../middleware/JWT-Action";

const router = express.Router();

const intiApiRoutes = (app) => {
  router.all("*", checkUserJWT, checkUserPermission);
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);
  router.post("/logout", apiController.handleLogout);

  //User
  router.get("/account", userController.handleGetUserAccount);
  router.get("/user/show", userController.handleShowUser);
  router.post("/user/create", userController.handleCreateUser);
  router.put("/user/update", userController.handleUpdateUser);
  router.delete("/user/delete", userController.handleDeleteUser);

  // group
  router.get("/group/show", groupController.handleShowGroup);
  // Roles
  router.get("/role/show", roleController.handleShowRole);
  router.get("/role/by-group/:groupId", roleController.handleGetRoleByGroup);
  router.post("/role/assign-to-group", roleController.handleAssignRoleToGroup);
  router.post("/role/create", roleController.handleCreateRole);
  router.put("/role/update", roleController.handleUpdateRole);
  router.delete("/role/delete", roleController.handleDeleteRole);

  return app.use("/api/v1", router);
};

export default intiApiRoutes;

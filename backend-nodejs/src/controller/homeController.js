import userService from "../service/userTestService";

const handleHelloWorld = (req, res) => {
  return res.render("home.ejs");
};

const handleUserPage = async (req, res) => {
  let userList = await userService.getListUser();
  return res.render("user.ejs", { userList });
};

const handleCreateNewUser = async (req, res) => {
  let { email, password, username } = req.body;

  await userService.CreateNewUser(email, password, username);

  return res.redirect("/user");
};

const handleDeleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);
  return res.redirect("/user");
};

const getUserById = async (req, res) => {
  let { id } = req.params;
  let user = await userService.getUserById(id);
  let userData = {};
  userData = user;
  return res.render("user-update.ejs", { userData });
};

const handleUpdateUser = async (req, res) => {
  let { email, username, id } = req.body;

  await userService.updateUserInfo(email, username, id);
  return res.redirect("/user");
};
module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateNewUser,
  handleDeleteUser,
  getUserById,
  handleUpdateUser,
};

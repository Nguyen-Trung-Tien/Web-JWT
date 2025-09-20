import userService from "../service/userService";

const handleHelloWorld = (req, res) => {
  return res.render("home.ejs");
};

const handleUserPage = async (req, res) => {
  let userList = await userService.getListUser();
  await userService.deleteUser();
  return res.render("user.ejs", { userList });
};

const handleCreateNewUser = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;

  userService.CreateNewUser(email, password, username);

  return res.redirect("/user");
};

const handleDeleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);
  return res.redirect("/user");
};

module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateNewUser,
  handleDeleteUser,
};

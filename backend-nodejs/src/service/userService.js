import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = async (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const CreateNewUser = async (email, password, username) => {
  let hashPassword = await hashUserPassword(password);
  // let checkPassword = await bcrypt.compare(password, hashPassword);

  try {
    await db.User.create({
      email: email,
      username: username,
      password: hashPassword,
    });
  } catch (e) {
    console.log("Insert error:", e);
    throw e;
  }
};

const getListUser = async () => {
  try {
    let users = [];
    users = await db.User.findAll();
    return users;
  } catch (e) {
    console.log(e);
  }
};

const deleteUser = async (userId) => {
  try {
    await db.User.destroy({
      where: {
        id: userId,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

const getUserById = async (userId) => {
  try {
    let users = {};
    users = await db.User.findOne({
      where: {
        id: userId,
      },
    });
    return users.get({ plain: true });
  } catch (e) {
    console.log(e);
  }
};

const updateUserInfo = async (email, username, id) => {
  try {
    await db.User.update(
      { email: email, username: username },
      {
        where: { id: id },
      }
    );
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  CreateNewUser,
  getListUser,
  deleteUser,
  getUserById,
  updateUserInfo,
};

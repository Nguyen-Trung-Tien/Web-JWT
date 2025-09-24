import { where } from "sequelize";
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
    let newUser = await db.User.findOne({
      where: { id: 1 },
      attributes: ["id", "username", "email"],
      include: { model: db.Group, attributes: ["id", "name", "description"] },
      raw: true,
      nest: true,
    });

    // let roles = await db.Group.findOne({
    //   where: { id: 1 },
    //   include: { model: db.Role },
    //   raw: true,
    //   nest: true,
    // });

    let r = await db.Role.findAll({
      include: {
        where: { id: 1 },
        model: db.Group,
        attributes: ["name", "description"],
      },
      attributes: ["url", "description"],
      raw: true,
      nest: true,
    });
    console.log(">>> Check new users", newUser);
    console.log(">>> Check roles", r);

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
    return users;
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

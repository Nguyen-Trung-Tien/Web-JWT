import db from "../models/index";

const getAllUser = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "userName", "email", "phoneNumber", "sex"],
      include: { model: db.Group, attributes: ["name", "description"] },
      raw: true,
      nest: true,
    });

    if (users) {
      return {
        EM: "Get all user success!",
        EC: 0,
        DT: users,
      };
    } else {
      return {
        EM: "Get all user success!",
        EC: 0,
        DT: [],
      };
    }
  } catch (e) {
    return {
      EM: "Something wrong with server...!",
      EC: -2,
      DT: [],
    };
  }
};

const createUser = async (data) => {
  try {
    await db.User.create({});
  } catch (e) {
    console.log(e);
  }
};
const updateUser = async (data) => {
  try {
    let users = await db.User.findOne({
      where: { id: data },
    });
    if (users) {
      users.save({});
    } else {
    }
  } catch (e) {
    console.log(e);
  }
};
const deleteUser = async (id) => {
  try {
    await db.User.delete({
      where: { id: id },
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getAllUser, updateUser, createUser, deleteUser };

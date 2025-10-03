import db from "../models/index";

const getAllUser = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "userName", "email", "phoneNumber", "sex"],
      include: { model: db.Group, attributes: ["name", "description"] },
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

const getUserWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
      attributes: ["id", "userName", "email", "phoneNumber", "sex"],
      include: { model: db.Group, attributes: ["name", "description"] },
    });

    let totalPage = Math.ceil(count / limit);
    let data = { totalRows: count, totalPage: totalPage, users: rows };

    return {
      EM: "OK",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Something wrong with server...!",
      EC: -2,
      DT: [],
    };
  }
};

const createUser = async (data) => {
  try {
    await db.User.create(data);
    return {
      EM: "OK",
      EC: 0,
      DT: [],
    };
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
    let user = await db.User.findOne({
      where: { id: id },
    });
    if (user) {
      await user.destroy();
      return {
        EM: "Delete a user success!",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "User not exits!",
        EC: 1,
        DT: [],
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "Something wrong with server...!",
      EC: -2,
      DT: [],
    };
  }
};

module.exports = {
  getAllUser,
  updateUser,
  createUser,
  deleteUser,
  getUserWithPagination,
};

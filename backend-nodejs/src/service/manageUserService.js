import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword);
};

const checkEmailUserExits = async (userEmail) => {
  let emailUser = await db.User.findOne({
    where: { email: userEmail },
  });
  if (emailUser) {
    return true;
  }
  return false;
};

const checkPhoneUserExits = async (userPhone) => {
  let phoneUser = await db.User.findOne({
    where: { phoneNumber: userPhone },
  });
  if (phoneUser) {
    return true;
  }
  return false;
};

const getAllUser = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "username", "email", "phoneNumber", "sex"],
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
      attributes: ["id", "username", "email", "phoneNumber", "address", "sex"],
      include: { model: db.Group, attributes: ["id", "name", "description"] },
      order: [["id", "DESC"]],
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
    // check email || phoneNumber
    let checkEmailExits = await checkEmailUserExits(data.email);
    if (checkEmailExits == true) {
      return {
        EM: "The email already exists!",
        EC: 1,
        DT: "email",
      };
    }
    let checkPhoneExits = await checkPhoneUserExits(data.phoneNumber);
    if (checkPhoneExits == true) {
      return {
        EM: "The phone number already exists!",
        EC: 1,
        DT: "phone number",
      };
    }
    // hash password
    let hashPassword = hashUserPassword(data.password);
    await db.User.create({ ...data, password: hashPassword });
    return {
      EM: "Create a user success!",
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

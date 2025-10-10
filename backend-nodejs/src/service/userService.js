import db from "../models/index";
require("dotenv").config();
import { Op } from "sequelize";
import { getGroupWithRoles } from "../service/jwtService";
import { createJWT } from "../middleware/JWT-Action";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
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

const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword);
};

const registerNewUser = async (rawUserData) => {
  try {
    // check email || phoneNumber
    let checkEmailExits = await checkEmailUserExits(rawUserData.email);
    if (checkEmailExits == true) {
      return {
        EM: "The email already exists!",
        EC: 1,
      };
    }
    let checkPhoneExits = await checkPhoneUserExits(rawUserData.phoneNumber);
    if (checkPhoneExits == true) {
      return {
        EM: "The phone number already exists!",
        EC: 1,
      };
    }
    // hash password
    let hashPassword = hashUserPassword(rawUserData.password);

    // create user
    await db.User.create({
      email: rawUserData.email,
      username: rawUserData.username,
      phoneNumber: rawUserData.phoneNumber,
      password: hashPassword,
      groupId: 6,
    });

    return {
      EM: "A user created successfully!",
      EC: 0,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Something wrongs in service!...",
      EC: -2,
    };
  }
};

const handleUserLogin = async (rawData) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [
          { email: rawData.valueLogin },
          { phoneNumber: rawData.valueLogin },
        ],
      },
    });

    if (user) {
      let isCorrectPassword = checkPassword(rawData.password, user.password);
      if (isCorrectPassword === true) {
        let groupWithRoles = await getGroupWithRoles(user);
        let payload = {
          email: user.email,
          phoneNumber: user.phoneNumber,
          username: user.username,
          groupWithRoles,
          expiresIn: process.env.JWT_EXPIRES_IN,
        };
        let token = createJWT(payload);
        return {
          EM: "Login success!",
          EC: 0,
          DT: {
            access_token: token,
            groupWithRoles,
            email: user.email,
            username: user.username,
            phoneNumber: user.phoneNumber,
          },
        };
      }
    }

    return {
      EM: "Not input found user!",
      EC: 1,
    };
  } catch (e) {
    return {
      EM: "Something wrongs in service!...",
      EC: -2,
    };
  }
};

module.exports = { registerNewUser, handleUserLogin };

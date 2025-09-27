import db from "../models/index";
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
    return false;
  }
  return true;
};

const checkPhoneUserExits = async (userPhone) => {
  let phoneUser = await db.User.findOne({
    where: { phoneNumber: userPhone },
  });
  if (phoneUser) {
    return false;
  }
  return true;
};

const registerNewUser = async (rawUserData) => {
  try {
    // check email || phoneNumber

    let checkEmailExits = await checkEmailUserExits(rawUserData.email);
    if (checkEmailExits == false) {
      return {
        EM: "The email already exists!",
        EC: 1,
      };
    }
    let checkPhoneExits = await checkPhoneUserExits(rawUserData.phoneNumber);
    if (checkPhoneExits == false) {
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

module.exports = { registerNewUser };

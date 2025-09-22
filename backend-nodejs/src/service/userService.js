import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
import mysql from "mysql2/promise";
import bluebird from "bluebird";

const hashUserPassword = async (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;

  // let checkPassword = await bcrypt.compare(password, hashPassword); // true
};

const CreateNewUser = async (email, password, username) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    password: "123456",
    user: "root",
    database: "web-jwt",
    Promise: bluebird,
  });

  let hashPassword = await hashUserPassword(password);

  if (!email || !password || !username || !hashPassword) {
    throw new Error("Invalid input: email, password, username are required");
  }

  try {
    const [row] = await connection.execute(
      "INSERT INTO user (email, password, username, createdAt, updatedAt) VALUES (?,?,?,?,?)",
      [email, hashPassword, username, new Date(), new Date()]
    );
    return row;
  } catch (e) {
    console.log("Insert error:", e);
    throw e;
  }
};

const getListUser = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    password: "123456",
    user: "root",
    database: "web-jwt",
    Promise: bluebird,
  });
  try {
    const [row, fields] = await connection.execute("Select * From user");
    return row;
  } catch (e) {
    console.log(e);
  }
};

const deleteUser = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    password: "123456",
    user: "root",
    database: "web-jwt",
    Promise: bluebird,
  });
  try {
    const [row, fields] = await connection.execute(
      "DELETE FROM user WHERE id=?",
      [id]
    );
    return row;
  } catch (e) {
    console.log(e);
  }
};

const getUpdateUserById = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    password: "123456",
    user: "root",
    database: "web-jwt",
    Promise: bluebird,
  });
  try {
    const [row, fields] = await connection.execute(
      "SELECT* FROM user WHERE id=?",
      [id]
    );
    return row;
  } catch (e) {
    console.log(e);
  }
};

const updateUserInfo = async (email, username, id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    password: "123456",
    user: "root",
    database: "web-jwt",
    Promise: bluebird,
  });
  try {
    const [row, fields] = await connection.execute(
      "UPDATE  user SET  email = ?, username = ? WHERE id = ?",
      [email, username, id]
    );
    return row;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  CreateNewUser,
  getListUser,
  deleteUser,
  getUpdateUserById,
  updateUserInfo,
};

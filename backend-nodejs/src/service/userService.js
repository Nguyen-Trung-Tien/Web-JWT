import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
import mysql from "mysql2/promise";
import bluebird from "bluebird";

const hashUserPassword = (userPassword) => {
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
  let hashPassword = hashUserPassword(password);

  try {
    const [row, fields] = await connection.query(
      "INSERT  INTO users (email, password,username) VALUES (?,?,?)",
      [email, hashPassword, username],
      function (err, results, fields) {}
    );
  } catch (e) {
    console.log(e);
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
    const [row, fields] = await connection.execute("Select * From users");
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
      "DELETE FROM users WHERE id=?",
      [id]
    );
    return row;
  } catch (e) {
    console.log(e);
  }
};

module.exports = { CreateNewUser, getListUser, deleteUser };

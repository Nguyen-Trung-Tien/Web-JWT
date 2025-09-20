import mysql from "mysql2";

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  password: "123456",
  user: "root",
  database: "web-jwt",
});

const handleHelloWorld = (req, res) => {
  return res.render("home.ejs");
};

const handleUserPage = (req, res) => {
  return res.render("user.ejs");
};

const handleCreateNewUser = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;

  // A simple SELECT query
  connection.query(
    "INSERT  INTO users (email, password,username) VALUES (?,?,?)",
    [email, password, username],
    function (err, results, fields) {
      console.log(results);
      console.log(fields);
    }
  );
  return res.send("handlerCreateNewUser");
};

module.exports = { handleHelloWorld, handleUserPage, handleCreateNewUser };

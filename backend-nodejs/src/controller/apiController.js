import userService from "../service/userService";

const handleRegister = async (req, res) => {
  try {
    let { email, phoneNumber, password, confirmPassword } = req.body;
    if (!email || !phoneNumber || !password) {
      return res.status(201).json({
        EM: "Missing required parameter!",
        EC: 1,
        DT: "",
      });
    }

    // check password length
    if (password.length < 6) {
      return res.status(201).json({
        EM: "Your password must have more than 6 characters!",
        EC: 1,
        DT: "",
      });
    }

    // check confirm password
    if (password !== confirmPassword) {
      return res.status(201).json({
        EM: "Confirm password does not match!",
        EC: 1,
        DT: "",
      });
    }

    // create user
    let data = await userService.registerNewUser(req.body);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: "",
    });
  } catch (e) {
    return res.status(500).json({
      EM: "Error from server!",
      EC: -1,
      DT: "",
    });
  }
};

const handleLogin = (req, res) => {
  try {
    console.log("Check body", req.body);
    return res.status(201).json({
      EM: "Your password must have more than 6 characters!",
      EC: 1,
      DT: "",
    });
  } catch (e) {
    return res.status(500).json({
      EM: "Error from server!",
      EC: -1,
      DT: "",
    });
  }
};
module.exports = { handleRegister, handleLogin };

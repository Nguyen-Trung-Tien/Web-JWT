import manageUserService from "../service/manageUserService";

const handleShowUser = async (req, res) => {
  try {
    let data = await manageUserService.getAllUser();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "Error from server....!",
      EC: -1,
      DT: "",
    });
  }
};

const handleCreateUser = (req, res) => {
  try {
  } catch (e) {
    return res.status(500).json({
      EM: "Error from server....!",
      EC: -1,
      DT: "",
    });
  }
};
const handleUpdateUser = (req, res) => {
  try {
  } catch (e) {
    return res.status(500).json({
      EM: "Error from server....!",
      EC: -1,
      DT: "",
    });
  }
};
const handleDeleteUser = (req, res) => {
  try {
  } catch (e) {
    return res.status(500).json({
      EM: "Error from server....!",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = {
  handleCreateUser,
  handleShowUser,
  handleDeleteUser,
  handleUpdateUser,
};

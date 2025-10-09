import manageUserService from "../service/manageUserService";

const handleShowUser = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;
      let data = await manageUserService.getUserWithPagination(+page, +limit);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } else {
      let data = await manageUserService.getAllUser();
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "Error from server....!",
      EC: -1,
      DT: "",
    });
  }
};

const handleCreateUser = async (req, res) => {
  try {
    let data = await manageUserService.createUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "Error from server....!",
      EC: -1,
      DT: "",
    });
  }
};

const handleUpdateUser = async (req, res) => {
  try {
    let data = await manageUserService.updateUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "Error from server....!",
      EC: -1,
      DT: "",
    });
  }
};

const handleDeleteUser = async (req, res) => {
  try {
    let data = await manageUserService.deleteUser(req.body.id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
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

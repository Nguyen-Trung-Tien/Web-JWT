import roleService from "../service/roleService";
import manageUserService from "../service/manageUserService";

const handleShowRole = async (req, res) => {
  try {
    let data = await roleService.getAllRole();
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
const handleGetRoleByGroup = async (req, res) => {
  try {
    let id = req.params.groupId;
    let data = await roleService.getRoleByGroup(id);
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

const handleCreateRole = async (req, res) => {
  try {
    let data = await roleService.createRole(req.body);
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

const handleUpdateRole = async (req, res) => {
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

const handleDeleteRole = async (req, res) => {
  try {
    let data = await roleService.deleteRole(req.body.id);
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

const handleAssignRoleToGroup = async (req, res) => {
  try {
    let data = await roleService.assignRoleToGroup(req.body.data);
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
  handleCreateRole,
  handleDeleteRole,
  handleShowRole,
  handleUpdateRole,
  handleGetRoleByGroup,
  handleAssignRoleToGroup,
};

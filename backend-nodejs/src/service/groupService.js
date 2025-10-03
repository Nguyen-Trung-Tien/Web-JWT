import db from "../models/index";

const getGroups = async () => {
  try {
    let data = await db.Group.findAll({
      order: [["name", "DESC"]],
    });
    return {
      EM: "Get all group success!",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Error from server...!",
      EC: -1,
      DT: "",
    };
  }
};

module.exports = { getGroups };

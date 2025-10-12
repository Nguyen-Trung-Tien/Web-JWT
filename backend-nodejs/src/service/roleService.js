import db from "../models/index";

const createRole = async (role) => {
  try {
    let currentRole = await db.Role.findAll({
      attributes: ["url", "description"],
      raw: true,
    });

    const persists = role.filter(
      ({ url: url1 }) => !currentRole.some(({ url: url2 }) => url1 === url2)
    );
    if (persists.length === 0) {
      return {
        EM: "Nothing to create!...",
        EC: 0,
        DT: [],
      };
    }
    await db.Role.bulkCreate(persists);
    return {
      EM: `Create success ${persists.length} roles`,
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs in service!...",
      EC: -2,
    };
  }
};

const getRoleByGroup = async (id) => {
  try {
    if (!id) {
      return {
        EM: "Not found any roles!",
        EC: 0,
        DT: [],
      };
    }

    let role = await db.Group.findOne({
      where: { id: id },
      include: [
        {
          model: db.Role,
          attributes: ["id", "url", "description"],
          through: { attributes: [] },
        },
      ],
    });

    return {
      EM: "Get roles by group success!",
      EC: 0,
      DT: role,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs in service!...",
      EC: -2,
    };
  }
};
const getAllRole = async () => {
  try {
    let data = await db.Role.findAll({
      attributes: ["id", "url", "description"],
      order: [["id", "DESC"]],
    });
    return {
      EM: "Get all roles success!",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs in service!...",
      EC: -2,
    };
  }
};

const deleteRole = async (id) => {
  try {
    let role = await db.Role.findOne({
      where: { id: id },
    });
    if (role) {
      await role.destroy();
      return {
        EM: "Delete a role success!",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "Role not exits!",
        EC: -1,
        DT: [],
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "Something wrong with server...!",
      EC: -2,
      DT: [],
    };
  }
};

module.exports = { createRole, getAllRole, deleteRole, getRoleByGroup };

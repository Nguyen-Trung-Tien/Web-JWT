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

module.exports = { createRole };

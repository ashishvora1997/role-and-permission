const asyncHandler = require("express-async-handler");
const { Role } = require("../models");

const getAllRoleList = asyncHandler(async (req, res) => {
  const data = await Role.findAll({
    // attributes: ["name"]
    order: [
      ["id", "ASC"],
      ["name", "DESC"],
    ],
  });

  res.status(200).json({ status: "success", data });
});

const addNewRole = asyncHandler(async (req, res) => {
  const { name } = req.body;
  // Validate the request body
  if (!name?.trim()) {
    res.status(400);
    throw new Error("Please provide role name");
  }

  const isRoleAvailable = await Role.findOne({ where: { name } });

  console.log("isRoleAvailable", isRoleAvailable);

  if (isRoleAvailable) {
    res.status(400);
    throw new Error("Role already exists");
  }
  // Create a new user
  const role = await Role.create({
    name,
  });
  if (role) {
    res.status(201).json({
      message: "role created successfully",
      role: {
        id: role.id,
        name: role.name,
      },
    });
  } else {
    res.status(400);
    throw new Error("role creation failed");
  }
});

const deleteRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const role = await Role.findByPk(id);
  if (!role) {
    res.status(404);
    throw new Error("Role not found");
  }

  // Delete the role
  await role.destroy();

  res.status(200).json({
    status: "success",
    message: `${role.name} Role deleted successfully`,
  });
});

const bulkAddRoles = asyncHandler(async (req, res) => {
  const { roles } = req.body; // roles should be an array of objects: [{ name: "ADMIN" }, { name: "USER" }, ...]

  if (!Array.isArray(roles) || roles.length === 0) {
    res.status(400);
    throw new Error("Please provide a non-empty array of roles");
  }

  const existing = await Role.findAll({
    where: { name: roles }
  });

  console.log("existing", existing)

  if (existing.length) {
    res.status(403).json({
      message: `${existing.length} roles already exist`,
      data: existing.map((item) => item.name),
    });
  }

  try {
    const insertedRoles = await Role.bulkCreate(roles.map((name) => ({ name })), {
      validate: true,
      ignoreDuplicates: true, // skip if role name is unique and already exists

    });

    res.status(201).json({
      message: `${insertedRoles.length} roles added successfully`,
      data: insertedRoles,
    });
  } catch (error) {
    console.error("Bulk insert error:", error);
    res.status(500);
    throw new Error("Failed to insert roles");
  }
});

module.exports = {
  getAllRoleList,
  addNewRole,
  deleteRole,
  bulkAddRoles
};

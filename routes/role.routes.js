const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const {
  getAllRoleList,
  addNewRole,
  deleteRole,
  bulkAddRoles,
} = require("../controllers/role.controller");

const routes = express.Router();

routes.get("/", validateToken, getAllRoleList);
routes.post("/", validateToken, addNewRole);
routes.delete("/:id", validateToken, deleteRole);
routes.post("/bulk", validateToken, bulkAddRoles);

module.exports = routes;

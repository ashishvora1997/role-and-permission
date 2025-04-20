const express = require("express");
const { getAllUsersList, registerUser, loginUser, deleteUser, getUserRoles, updateUserRoles } = require("../controllers/user.controller");
const validateToken = require("../middleware/validateTokenHandler");
const checkRole = require("../middleware/checkRole");

const router = express.Router();

router.get("/", validateToken, checkRole(["SUPER_ADMIN"]), getAllUsersList)

router.post("/register", validateToken, checkRole(["SUPER_ADMIN"]), registerUser);

router.post("/login", loginUser);

router.delete("/:id", validateToken, checkRole(["SUPER_ADMIN"]), deleteUser);

router.get("/:id", validateToken, checkRole(["SUPER_ADMIN"]), getUserRoles);

router.post("/:id/role-update", validateToken, checkRole(["SUPER_ADMIN"]), updateUserRoles);




module.exports = router;

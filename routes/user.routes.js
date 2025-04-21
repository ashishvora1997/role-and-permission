const express = require("express");
const { getAllUsersList, registerUser, loginUser, deleteUser, getUserRoles, updateUserRoles } = require("../controllers/user.controller");
const validateToken = require("../middleware/validateTokenHandler");
const checkRole = require("../middleware/checkRole");

const router = express.Router();

router.get("/", validateToken, checkRole([]), getAllUsersList)

router.post("/register", validateToken, checkRole([]), registerUser);

router.post("/login", loginUser);

router.delete("/:id", validateToken, checkRole([]), deleteUser);

router.get("/:id", validateToken, checkRole([]), getUserRoles);

router.post("/:id/role-update", validateToken, checkRole([]), updateUserRoles);




module.exports = router;

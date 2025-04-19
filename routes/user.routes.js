const express = require("express");
const { getAllUsersList, registerUser, loginUser } = require("../controllers/user.controller");
const validateToken = require("../middleware/validateTokenHandler");
const checkRole = require("../middleware/checkRole");

const router = express.Router();

router.get("/", validateToken, checkRole(["SUPER_ADMIN"]), getAllUsersList)

router.post("/register", validateToken, checkRole(["SUPER_ADMIN"]), registerUser);

router.post("/login", loginUser);

// router.get("/profile", validateToken, getUserProfile);

// router.patch("/profile", validateToken, updateUserProfile);

// router.delete("/profile", validateToken, deleteUserProfile);

// router.post("/changePassword", validateToken, changeUserPassword);


module.exports = router;

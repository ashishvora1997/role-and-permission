const express = require('express');
const { createTask, getTaskList } = require('../controllers/task.controller');
const validateToken = require('../middleware/validateTokenHandler');
const checkRole = require('../middleware/checkRole');

const router = express.Router();

router.get("/", validateToken, checkRole(["TASK_VIEW", "TASK_CREATE", "TASK_EDIT", "TASK_DELETE"]), getTaskList);
router.post("/", validateToken, checkRole(["TASK_CREATE"]), createTask);

module.exports = router;
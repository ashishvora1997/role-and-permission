const asyncHandler = require("express-async-handler");
const { Task, User, Role } = require("../models");

const createTask = asyncHandler(async (req, res) => {
  try {
    const { title, description, status } = req.body;
    if (!title || !description || !status) {
      res.status(400);
      throw new Error("Please provide all required fields");
    }
    const task = await Task.create({
      title,
      description,
      status,
      user_id: req.user.id,
    });

    if (task) {
      res.status(201).json({
        message: "Task Created successfully",
        task,
      });
    } else {
      res.status(400);
      throw new Error("User registration failed");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const getTaskList = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    include: {
      model: Role,
      attributes: ["id", "name"],
      through: { attributes: [] },
    },
  });

  const isSuperAdmin = user.Roles.some((role) => role.name === "SUPER_ADMIN");

  let tasks = [];
  if (isSuperAdmin) {
    tasks = await Task.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
    });
  } else {
    const userWithTasks = await User.findByPk(req.user.id, {
      include: [
        {
          model: Task,
          as: "tasks",
        },
      ],
    });
    tasks = userWithTasks.tasks;
  }

  res.status(200).json({
    message: "List",
    data: tasks,
  });
});

module.exports = {
  createTask,
  getTaskList,
};

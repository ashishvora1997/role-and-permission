const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Role } = require("../models");

const getAllUsersList = async (req, res) => {
  const data = await User.findAll({
    attributes: [
      "id",
      "name",
      ["email", "email_address"],
      // "password",
      "created_at",
      "updated_at",
    ],
    include: [
      {
        model: Role,
        attributes: ["name"], // Only include role name
        through: { attributes: [] }, // Hide join table data
      },
    ],
    // where: {
    //   id: 1,
    // },
    // order: [["id", "DESC"]],
    // limit: 5,
    // offset: 0,
  });

  // Format roles to only include role names (strings)
  const formattedData = data.map(user => {
    const userJson = user.toJSON(); // Convert Sequelize instance to plain object
    const roles = userJson.Roles.map(role => role.name);
    delete userJson.Roles;
    return {
      ...userJson, // Spread the plain object properties
      roles,
    };
  });

  res.status(200).json({
    status: "success",
    data: formattedData,
  });
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, roles = [] } = req.body;
  // Validate the request body
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const isUserAvailable = await User.findOne({ where: { email } });

  console.log("isUserAvailable", isUserAvailable);

  if (isUserAvailable) {
    res.status(400);
    throw new Error("User already exists");
  }

    // Find roles by name (if provided)
    let assignedRoles = [];

    if (roles.length > 0) {
      assignedRoles = await Role.findAll({
        where: {
          name: roles
        }
      });
  
      if (assignedRoles.length !== roles.length) {
        return res.status(400).json({
          message: "Some roles are invalid or not found",
          provided: roles,
          validRoles: assignedRoles.map(r => r.name),
        });
      }
    } else {
      // If no roles provided, assign default role (Visitor)
      const defaultRole = await Role.findOne({ where: { name: "VISITOR" } });
      assignedRoles = [defaultRole];
    }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Associate roles with the user
  await user.setRoles(assignedRoles);

  if (user) {
    res.status(201).json({
      message: "Register successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        password,
        roles: assignedRoles.map(r => r.name)
      },
    });
  } else {
    res.status(400);
    throw new Error("User registration failed");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Validate the request body
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    res.status(400);
    throw new Error("User not Registered");
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    // Generate JWT token
    const token = jwt.sign(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.status(200).json({
      token,
    });
  }

  res.status(401);
  throw new Error("Invalid credentials");
});

module.exports = {
  getAllUsersList,
  registerUser,
  loginUser,
};

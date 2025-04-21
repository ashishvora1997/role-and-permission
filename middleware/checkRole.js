const { User, Role } = require("../models");

const checkRole = (requiredRoles = []) => {
  return async (req, res, next) => {
    try {
      const user = await User.findByPk(req.user.id, {
        include: {
          model: Role,
          through: { attributes: [] }, // exclude join table data
        }
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const userRoles = user.Roles.map(role => role.name);

      const hasRole = [...requiredRoles, "SUPER_ADMIN"].some(role => userRoles.includes(role));

      if (!hasRole) {
        return res.status(403).json({ message: "Access denied. Insufficient role." });
      }

      next();
    } catch (err) {
      console.error("Role check failed:", err);
      return res.status(500).json({ message: "Internal server error during role check" });
    }
  };
};

module.exports = checkRole;

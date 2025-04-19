const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { User } = require("../models");


const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      // Get token from header
      token = authHeader.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) => {
          if (err) {
            return res.status(401).json({ message: "Token is not Authorized" });
          }
          console.log("decoded", decoded);
          return decoded;
        }
      );

      const user = await User.findOne({ where: { email: decoded.user.email }});
      if (!user) {
        res.status(500).json({ message: "User not Exist, maybe deleted"});
      }

      // Attach user to request object
      req.user = decoded.user;
      req.user.iat = decoded.iat;
      req.user.exp = decoded.exp;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
});

module.exports = validateToken;

const jwt = require("jsonwebtoken");
const User = require("../models/auth.model");
const verifyToken = async (req, res, next) => {
  try {
    const tokenReceived = req.headers["authorization"];
    const decoded = jwt.verify(tokenReceived, process.env.JWT_SECRET_KEY);
    const user = await User.findUserById(decoded);
    req.user = user;
    if (user) {
      next();
    } else res.status(404).json({ message: "User not found" });
  } catch (error) {
    res.status(403).json({ message: "Invalid Token", error });
  }
};

module.exports = verifyToken;

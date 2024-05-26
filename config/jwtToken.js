const jwt = require("jsonwebtoken");

function generateToken({ email }) {
  return jwt.sign({ email }, process.env.JWT_TOKEN, { expiresIn: "3d" });
}

module.exports = { generateToken };

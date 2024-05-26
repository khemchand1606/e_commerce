const jwt = require("jsonwebtoken");
const { getDocumentByEmail } = require("../controller/commonController");

async function authMiddleware(req, res, next) {
  let token = req?.headers?.authorization.startsWith("Bearer");
  if (token) {
    token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_TOKEN);
      const user = await getDocumentByEmail({ email: decoded.email });
      console.log({ decoded });
      req.user = user;
      next();
    } catch (error) {
      throw new Error("Please login again.");
    }
  } else {
    throw new Error("Invalid authorization");
  }
}

async function isAdmin(req, res, next) {
  const { email } = req.user;
  const { role } = await getDocumentByEmail({ email });
  if (role !== "admin") {
    throw new Error("You haven't permission.");
  } else {
    next();
  }
}

module.exports = { authMiddleware };

const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getAllUser,
  getUserById,
  deleteUserById,
  updateUserById,
} = require("../controller/userController");
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/users", getAllUser);
router.get("/:id", getUserById);
router.delete("/:id", deleteUserById);
router.put("/:id", updateUserById);

module.exports = router;

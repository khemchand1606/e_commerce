const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUser,
  getUserById,
  deleteUserById,
  updateUserById,
  blockUser,
  unblockUser,
} = require("../controller/userController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", authMiddleware, getAllUser);
router.get("/:id", getUserById);
router.delete("/:id", deleteUserById);
router.put("/:id", updateUserById);
router.put("/block_user/:id", blockUser);
router.put("/unblock_user/:id", unblockUser);

module.exports = router;

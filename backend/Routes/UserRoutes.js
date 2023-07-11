const express = require("express");
const router = express.Router();

const {
  createUser,
  getAllUsers,
  deleteUser,
  getParticularUser,
  getParticularFile,
  updateUser,
} = require("../Controllers/userController");

router.post("/newuser", createUser);
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.get("/users/:id", getParticularUser);
router.get("/getfile/:filename", getParticularFile);
router.put("/:id", updateUser);

module.exports = router;

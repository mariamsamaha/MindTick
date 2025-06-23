const express = require ("express");
const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/authMiddleware");
const { getUsers, getUserById, deleteUser } = require("../controllers/userController");
const router = express.Router();

router.get("/", protect, adminOnly, getUsers);
router.get("/:id",protect,getUserById);
router.delete("/:id",protect,adminOnly, deleteUser);


module.exports = router;

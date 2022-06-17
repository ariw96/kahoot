const express = require("express");
const router = express.Router();
const {
	registerUser,
	getUser,
	loginUser,
	getAllUsers,
} = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/all", getAllUsers);
router.get("/:id", getUser);
module.exports = router;

const express = require("express");
const router = express.Router();
const {
	getAccount,
	setAccount,
	updateAccount,
	deleteAccount,
} = require("../controllers/accountController");
const { protect } = require("../middleware/authMiddleware");
router.route("/").get(protect, getAccount).post(protect, setAccount);
router.route("/:id").delete(protect, deleteAccount).put(protect, updateAccount);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
	getQuiz,
	setQuiz,
	updateQuiz,
	deleteQuiz,
} = require("../controllers/quizController");
const { protect } = require("../middleware/authMiddleware");
router.route("/").get(protect, getQuiz).post(protect, setQuiz);
router.route("/:id").delete(protect, deleteQuiz).put(protect, updateQuiz);

module.exports = router;

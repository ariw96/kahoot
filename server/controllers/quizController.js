const asyncHandler = require("express-async-handler");
const Quiz = require("../models/quizModel");

// des get Quiz
// route GET /api/Quizzes
// access private
const getQuiz = asyncHandler(async (req, res) => {
	const quiz = await Quiz.find({ user: req.user.id });
	res.status(200).json(quiz);
});
// des set account
// route POST /api/Quizzes
// access private
const setQuiz = asyncHandler(async (req, res) => {
	const { quizName, question, answerList } = req.body.quizData;
	if (!quizName || !question) {
		throw new Error("Please provide a text");
	}

	const quiz = await Quiz.create({
		quizName: quizName,
		user: req.user._id,
		question: question,
		answerList: answerList,
	});
	res.status(200).json(quiz);
});
// des update Quiz
// route PUT /api/quiz/:id
// access private
const updateQuiz = asyncHandler(async (req, res) => {
	const quiz = await Quiz.findById(req.params.id);

	if (!quiz) {
		res.status(404);
		throw new Error("Quiz not found");
	}

	//check for user
	if (!req.user) {
		res.status(404);
		throw new Error("User not found");
	}
	//check logged in user is owner of quiz
	if (quiz.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("Not authorized");
	}

	const updatedQuiz = await Quiz.findByIdAndUpdate();
	res.status(200).json(updatedQuiz);
});
// des get account
// route DELETE /api/accounts/:id
// access private
const deleteQuiz = asyncHandler(async (req, res) => {
	const quiz = await Quiz.findById(req.params.id);
	if (!quiz) {
		res.status(404);
		throw new Error("Quiz not found");
	}

	//check for user
	if (!quiz.user) {
		res.status(404);
		throw new Error("User not found");
	}
	//check logged in user is owner of Quiz
	if (quiz.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("Not authorized");
	}
	await quiz.remove();
	res.status(200).json({ id: req.params.id });
});

module.exports = {
	getQuiz,
	setQuiz,
	updateQuiz,
	deleteQuiz,
};

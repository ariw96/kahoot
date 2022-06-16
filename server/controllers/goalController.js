const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");

// des get goal
// route GET /api/goals
// access private
const getGoals = asyncHandler(async (req, res) => {
	const goals = await Goal.find({ user: req.user.id });
	res.status(200).json(goals);
});
// des set goal
// route POST /api/goals
// access private
const setGoal = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		throw new Error("Please provide a text");
	}
	const goal = await Goal.create({
		text: req.body.text,
		user: req.user.id,
	});
	res.status(200).json(goal);
});
// des update goal
// route PUT /api/goals/:id
// access private
const updateGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);
	if (!goal) {
		res.status(404);
		throw new Error("Goal not found");
	}

	//check for user
	if (!req.user) {
		res.status(404);
		throw new Error("User not found");
	}
	//check logged in user is owner of goal
	if (goal.user.toString() !== req.id.toString()) {
		res.status(401);
		throw new Error("Not authorized");
	}

	const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.status(200).json(updatedGoal);
});
// des get goal
// route DELETE /api/goals/:id
// access private
const deleteGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);
	if (!goal) {
		res.status(404);
		throw new Error("Goal not found");
	}

	//check for user
	if (!req.user) {
		res.status(404);
		throw new Error("User not found");
	}
	//check logged in user is owner of goal
	if (goal.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("Not authorized");
	}
	await goal.remove();
	res.status(200).json({ id: req.params.id });
});

module.exports = {
	getGoals,
	setGoal,
	updateGoal,
	deleteGoal,
};

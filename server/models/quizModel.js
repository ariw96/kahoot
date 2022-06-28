const mongoose = require("mongoose");
const quizSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		quizName: {
			type: String,
			required: [true, "Please add a text value"],
		},
		// numberOfQuestions: {
		// 	type: Number,
		// 	default: 0,
		// },
		question: {
			type: String,
			required: [true, "Please add a text value"],
		},
		answerList: [
			{
				answer: { type: String },
				isCorrect: { type: Boolean },
			},
		],
	},
	{
		timestamps: true,
	}
);
module.exports = mongoose.model("Quiz", quizSchema);

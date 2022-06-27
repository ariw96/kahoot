const mongoose = require("mongoose");
const quizSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		text: {
			type: String,
			required: [true, "Please add a text value"],
		},
		cash: {
			type: Number,
			default: 0,
		},
		credit: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);
module.exports = mongoose.model("Quiz", quizSchema);

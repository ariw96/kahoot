const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
// des register new user
// route POST /api/users
// access public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !password) {
		res
			.status(400)
			.send({ email, password, name, message: "Please enter all fields" });
	}
	//hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	//create user
	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}
	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});
	if (user) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user.id),
		});
	} else {
		res.status(400);
		throw new Error("User not created invalid data");
	}
	res.send("User created");
});

// des post user
// route POST/api/login
// access public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	//check if user email
	const user = await User.findOne({ email });
	if (user && bcrypt.compareSync(password, user.password)) {
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user.id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid credentials");
	}
});
// des get user data
// route GET /api/users/me
// access private
const getMe = asyncHandler(async (req, res) => {
	res.status(200).json(req.user);
});
//generate token
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};
module.exports = {
	registerUser,
	loginUser,
	getMe,
};

const asyncHandler = require("express-async-handler");
const Account = require("../models/accountModel");

// des get account
// route GET /api/accounts
// access private
const getAccount = asyncHandler(async (req, res) => {
	const account = await Account.find({ user: req.user.id });
	res.status(200).json(account);
});
// des set account
// route POST /api/accounts
// access private
const setAccount = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		throw new Error("Please provide a text");
	}
	const account = await Account.create({
		text: req.body.text,
		user: req.user.id,
		cash: 0,
		credit: 0,
	});
	res.status(200).json(account);
});
// des update account
// route PUT /api/accounts/:id
// access private
const updateAccount = asyncHandler(async (req, res) => {
	const account = await Account.findById(req.params.id);

	if (!account) {
		res.status(404);
		throw new Error("account not found");
	}

	//check for user
	if (!req.user) {
		res.status(404);
		throw new Error("User not found");
	}
	//check logged in user is owner of account
	if (account.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("Not authorized");
	}
	if (
		req.body.withdraw > account.cash + account.credit ||
		req.body.transfer > account.cash + account.credit
	) {
		res.status(400);
		throw new Error("Not enough funds");
	}

	// const accountTransfer = await Account.findById(req.body.transferId || 0);
	// const cashAfterTransfer =
	// 	parseInt(req.body.transfer || 0) + parseInt(accountTransfer.cash || 0);
	// const accountTransferUpdate = await Account.findByIdAndUpdate(
	// 	req.body.transferId,
	// 	{ cash: cashAfterTransfer },
	// 	{ new: true }
	// );
	const deposit = parseInt(req.body.deposit) || 0;
	const withdraw = parseInt(req.body.withdraw) || 0;
	const updateCredit = parseInt(req.body.credit) || 0;

	const updatedAccount = await Account.findByIdAndUpdate(
		req.params.id,
		{
			cash: account.cash + deposit - withdraw,
			credit: updateCredit,
		},
		{
			new: true,
		}
	);
	res.status(200).json(updatedAccount);
});
// des get account
// route DELETE /api/accounts/:id
// access private
const deleteAccount = asyncHandler(async (req, res) => {
	const account = await Account.findById(req.params.id);
	if (!account) {
		res.status(404);
		throw new Error("account not found");
	}

	//check for user
	if (!account.user) {
		res.status(404);
		throw new Error("User not found");
	}
	//check logged in user is owner of account
	if (account.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("Not authorized");
	}
	await account.remove();
	res.status(200).json({ id: req.params.id });
});

module.exports = {
	getAccount,
	setAccount,
	updateAccount,
	deleteAccount,
};

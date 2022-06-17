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
	const cashUpdate =
		parseInt(account.cash) +
		parseInt(req.body.deposit || 0) -
		parseInt(req.body.withdraw || 0) -
		parseInt(req.body.transfer || 0);
	const creditUpdate = req.body.credit || account.credit;
	const accountTransfer = await Account.findById(req.body.transferId);
	const cashAfterTransfer =
		parseInt(req.body.transfer) + parseInt(accountTransfer.cash);
	const accountTransferUpdate = await Account.findByIdAndUpdate(
		req.body.transferId,
		{ cash: cashAfterTransfer },
		{ new: true }
	);

	const updatedAccount = await Account.findByIdAndUpdate(
		req.params.id,
		{ cash: cashUpdate, credit: creditUpdate, text: req.body.text },
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
	const account = await account.findById(req.params.id);
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
	await account.remove();
	res.status(200).json({ id: req.params.id });
});

module.exports = {
	getAccount,
	setAccount,
	updateAccount,
	deleteAccount,
};
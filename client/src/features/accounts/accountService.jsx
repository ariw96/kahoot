import axios from "axios";

const API_URL = "/api/accounts/";
//create account
export const createAccount = async (accountData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.post(API_URL, accountData, config);
	return response.data;
};

//get user account
export const getAccounts = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.get(API_URL, config);
	return response.data;
};
//delete account
const deleteAccount = async (accountId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.delete(API_URL + accountId, config);

	return response.data;
};
//deposit account
const updateAccount = async (accountData,accountId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.put(API_URL + accountId, config);

	return response.data;
};
const accountService = {
	createAccount,
	getAccounts,
	deleteAccount,
	depositAccount,
};
export default accountService;

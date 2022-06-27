import axios from "axios";

const API_URL = "/api/quizzes/";
//create quiz
export const createQuiz = async (quizData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.post(API_URL, quizData, config);
	// return response.data;
};

//get user quizzes
export const getQuizzes = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.get(API_URL, config);
	return response.data;
};
//delete account
const deleteQuiz = async (quizId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.delete(API_URL + quizId, config);

	return response.data;
};
//deposit account
const updateAccount = async (quizData, quizId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.put(API_URL + quizId, config);

	return response.data;
};
const quizService = {
	createQuiz,
	getQuizzes,
	deleteQuiz,
};
export default quizService;

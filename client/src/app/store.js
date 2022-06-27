import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import quizReducer from "../features/quizzes/quizSlice";
export const store = configureStore({
	reducer: {
		auth: authReducer,
		quizzes: quizReducer,
	},
});

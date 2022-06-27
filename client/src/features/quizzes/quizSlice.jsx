import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import quizService from "./quizService";

const initialState = {
	quizzes: [],
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};

//create new quiz
export const createQuiz = createAsyncThunk(
	"quizzes/createQuiz",
	async (quizData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await quizService.createQuiz(quizData, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);
//get user accounts
export const getQuizzes = createAsyncThunk(
	"quizzes/getAll",
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await quizService.getQuizzes(token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);
//delete account
export const deleteQuiz = createAsyncThunk(
	"quizzes/delete",
	async (id, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			console.log(id);
			return await quizService.deleteQuiz(id, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);
//update account
export const updateQuiz = createAsyncThunk(
	"quizzes/update",
	async (quizData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			// return await accountService.depositAccount(quizData, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const quizSlice = createSlice({
	name: "quiz",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createQuiz.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createQuiz.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.quizzes.push(action.payload);
			})
			.addCase(createQuiz.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})

			.addCase(getQuizzes.pending, (state) => {
				state.isLoading = true;
				console.log(state.accounts);
			})
			.addCase(getQuizzes.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.quizzes = action.payload;
			})
			.addCase(getQuizzes.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
			})
			.addCase(deleteQuiz.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteQuiz.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.quizzes = state.quizzes.filter((quiz) => {
					return quiz._id !== action.payload.id;
				});
			})
			.addCase(deleteQuiz.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = quizSlice.actions;
export default quizSlice.reducer;

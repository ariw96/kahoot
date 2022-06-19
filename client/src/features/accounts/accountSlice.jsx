import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import accountService from "./accountService";

const initialState = {
	accounts: [],
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};

//create new account
export const createAccount = createAsyncThunk(
	"accounts/createAccount",
	async (accountData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await accountService.createAccount(accountData, token);
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
export const getAccounts = createAsyncThunk(
	"accounts/getAll",
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await accountService.getAccounts(token);
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
export const deleteAccount = createAsyncThunk(
	"accounts/delete",
	async (id, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await accountService.deleteAccount(id, token);
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
export const updateAccount = createAsyncThunk(
	"accounts/update",
	async (accountData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await accountService.depositAccount(accountData, token);
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

export const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createAccount.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createAccount.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.accounts.push(action.payload);
			})
			.addCase(createAccount.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})

			.addCase(getAccounts.pending, (state) => {
				state.isLoading = true;
				console.log(state.accounts);
			})
			.addCase(getAccounts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.accounts = action.payload;
			})
			.addCase(getAccounts.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
			})
			.addCase(deleteAccount.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteAccount.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.accounts = state.accounts.filter((account) => {
					return account._id !== action.payload.id;
				});
			})
			.addCase(deleteAccount.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = accountSlice.actions;
export default accountSlice.reducer;

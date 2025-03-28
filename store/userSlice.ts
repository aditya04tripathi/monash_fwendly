import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@prisma/client";

interface UserState {
	user: User | null;
	isLoggedIn: boolean;
}

const initialState: UserState = {
	user: null,
	isLoggedIn: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
			state.isLoggedIn = true;
		},
		clearUser: (state) => {
			state.user = null;
			state.isLoggedIn = false;
		},
	},
});

export const { setUser, clearUser } = userSlice.actions;
export const useSelectUser = (state: { user: UserState }) => state.user;
export const useSelectIsLoggedIn = (state: { user: UserState }) =>
	state.user.isLoggedIn;

export default userSlice.reducer;

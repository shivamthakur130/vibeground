import {
	setUserData,
	removeUserData,
	getUser,
} from '@/lib/useLocalStorageUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
	user: null | {
		id: string;
		name: string;
		email: string;
		main_group: string;
		org_id: string;
		sub_group: string;
		token: string;
		updated_at: string;
		username: string;
		usn: string;
	};
};

const initialState = {
	user: getUser() || null,
} as UserState;

export const user = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserState>) => {
			console.log('action.payload.user', action.payload);
			state.user = action.payload.user;
			setUserData(action.payload.user);
		},
		updateUser: (state, action: PayloadAction<UserState>) => {
			state.user = action.payload.user;
		},
		// setToken: (state, action: PayloadAction<any>) => {
		// 	state.token = action.payload.token;
		// },
		// removeToken: (state, action: PayloadAction<UserState>) => {
		// 	state.token = null;
		// },
		removeUser: (state, action: PayloadAction<UserState>) => {
			removeUserData();
			state.user = null;
		},
	},
});

export const { setUser, updateUser, removeUser } = user.actions;
export default user.reducer;

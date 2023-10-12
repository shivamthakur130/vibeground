import {
	setUserData,
	removeUserData,
	getUser,
} from '@/lib/useLocalStorageUser';
import { User } from '@/types/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const defaultUser = {
	_id: '',
	data: '',
	userId: '',
	planId: '',
	email: '',
	type: '',
	firstName: '',
	lastName: '',
	userName: '',
	date_of_birth: null,
	gender: '',
	city: '',
	country: '',
	status: '',
	password: '',
	passport_back: '',
	passport_front: '',
	token: '',
	isEmailVerified: false,
	subscriptionId: '',
	expiry_date: null,
	purchase_date: null,
	photos: [],
};

type UserState = {
	user: null | User;
};

const initialState = {
	user: getUser() || defaultUser,
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
		updateUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
			setUserData(state.user);
		},
		// setToken: (state, action: PayloadAction<any>) => {
		// 	state.token = action.payload.token;
		// },
		// removeToken: (state, action: PayloadAction<UserState>) => {
		// 	state.token = null;
		// },
		removeUser: (state) => {
			removeUserData();
			state.user = defaultUser;
		},
	},
});

export const { setUser, updateUser, removeUser } = user.actions;
export default user.reducer;

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import userReducer from "./slice/user";

export const store = configureStore({
	reducer: {
		counterReducer,
		userReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

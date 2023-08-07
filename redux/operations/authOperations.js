import { createAsyncThunk } from '@reduxjs/toolkit';

import {
	registerAPI,
	loginAPI,
	logoutAPI,
	getUserProfileAPI
} from '../../services/firebaseAPI';

export const register = createAsyncThunk(
	'auth/register',
	async ({ avatar, name, email, password }, { rejectWithValue }) => {
		try {
			const userData = await registerAPI({ avatar, name, email, password });
			return {
				user: {
					uid: userData.stsTokenManager.uid,
					name: userData.displayName,
					email: userData.email,
					avatar: userData.photoURL
				},
				token: userData.stsTokenManager.accessToken,
				refreshToken: userData.stsTokenManager.refreshToken
			};
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message ?? error.message);
		}
	}
);

export const login = createAsyncThunk(
	'auth/login',
	async ({ email, password }, { rejectWithValue, dispatch }) => {
		try {
			const userData = await loginAPI({ email, password });
			return {
				user: {
					uid: userData.stsTokenManager.uid,
					name: userData.displayName,
					email: userData.email,
					avatar: userData.photoURL
				},
				token: userData.stsTokenManager.accessToken,
				refreshToken: userData.stsTokenManager.refreshToken
			};
		} catch (error) {
			return rejectWithValue('Email or password is wrong');
		}
	}
);

export const getCurrentUserInfo = createAsyncThunk(
	'auth/getCurrentUserInfo',
	async (_, { getState, rejectWithValue }) => {
		const { token } = getState().authorized;
		axiosHeaderToken.set(token);
		try {
			const userInfo = await getUserProfileAPI();
			return userInfo;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
	{
		condition: (_, { getState }) => {
			const { token } = getState().authorized;
			return Boolean(token);
		}
	}
);

export const logout = createAsyncThunk(
	'auth/logout',
	async (_, { rejectWithValue }) => {
		try {
			await logoutAPI();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

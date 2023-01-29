import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthService } from '../../services/authService'

export const register = createAsyncThunk(
	'auth/register',
	async ({ username, userId }, thunkAPI) => {
		try {
			return await AuthService.register(username, userId)
		} catch (e) {
			return thunkAPI.rejectWithValue(e)
		}
	}
)

export const login = createAsyncThunk(
	'/auth/login',
	async ({ token }, thunkAPI) => {
		try {
			localStorage.setItem('token', token)
			return { token }
		} catch (e) {
			return thunkAPI.rejectWithValue(e)
		}
	}
)

export const logout = createAsyncThunk(
	'auth/logout',
	async ({ token }, thunkAPI) => {
		try {
			return await AuthService.logout(token)
		} catch (e) {
			return thunkAPI.rejectWithValue(e)
		}
	}
)

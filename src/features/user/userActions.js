import { createAsyncThunk } from '@reduxjs/toolkit'

export const profile = createAsyncThunk(
	'user/profile',
	async ({ account }, thunkAPI) => {
		try {
			localStorage.setItem('user', JSON.stringify(account))
			return { account }
		} catch (e) {
			return thunkAPI.rejectWithValue(e)
		}
	}
)

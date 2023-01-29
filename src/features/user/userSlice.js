import { createSlice } from '@reduxjs/toolkit'
import { profile } from './userActions'

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		account: localStorage.getItem('user')
			? JSON.parse(localStorage.getItem('user'))
			: null
	},
	extraReducers: builder => {
		builder
			.addCase(profile.fulfilled, (state, { payload }) => {
				state.account = payload.account
			})
			.addCase(profile.rejected, state => {
				state.account = null
			})
	}
})

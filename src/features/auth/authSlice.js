import { createSlice } from '@reduxjs/toolkit'
import { login, logout, register } from './authActions'

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		token: localStorage.getItem('token') || ''
	},
	extraReducers: builder => {
		builder
			.addCase(register.fulfilled, (state, { payload }) => {
				state.token = payload.token
			})
			.addCase(register.rejected, state => {
				state.token = ''
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.token = payload.token
			})
			.addCase(login.rejected, state => {
				state.token = ''
			})
			.addCase(logout.fulfilled, state => {
				state.token = ''
			})
			.addCase(logout.rejected, state => {
				state.token = ''
			})
	}
})

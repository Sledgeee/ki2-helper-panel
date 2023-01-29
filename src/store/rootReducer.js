import { combineReducers } from 'redux'
import { authSlice } from '../features/auth/authSlice'
import { userSlice } from '../features/user/userSlice'

export const rootReducer = combineReducers({
	auth: authSlice.reducer,
	user: userSlice.reducer
})

import { combineReducers } from 'redux'
import { userSlice } from '../features/user/userSlice'

export const rootReducer = combineReducers({
	user: userSlice.reducer
})

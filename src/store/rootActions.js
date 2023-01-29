import * as authActions from '../features/auth/authActions'
import * as userActions from '../features/user/userActions'

export const rootActions = {
	...authActions,
	...userActions
}

import { $api, $ky } from '../features/api'

export const AuthService = {
	async tryLogin(username) {
		const response = await $ky.post('auth/login', {
			json: {
				username
			}
		})
		return response.json()
	},

	async checkOtp(id, userId, otp) {
		const response = await $ky.post('auth/check-otp', {
			json: {
				id,
				user_id: userId,
				otp
			}
		})
		return response.json()
	},

	async register(username, userId) {
		const response = await $ky.post('auth/register', {
			json: {
				username,
				userId
			}
		})
		return response.json()
	},

	async logout() {
		const response = await $api.post('auth/logout')
		localStorage.removeItem('user')
		localStorage.removeItem('token')
		return response.json()
	}
}

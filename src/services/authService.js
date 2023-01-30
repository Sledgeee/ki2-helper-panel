import { $api, $ky } from '../features/api'

export const AuthService = {
	async magicLogin(uid, username, otp, hash) {
		const response = await $ky.post('auth/magic-login', {
			json: {
				id: hash,
				user_id: uid,
				username,
				otp,
				is_magic: true
			}
		})
		return response.json()
	},

	async tryLogin(username) {
		const response = await $ky.post('auth/login', {
			json: {
				username
			}
		})
		return response.json()
	},

	async checkOtp(id, userId, username, otp) {
		const response = await $ky.post('auth/check-otp', {
			json: {
				id,
				user_id: userId,
				username,
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

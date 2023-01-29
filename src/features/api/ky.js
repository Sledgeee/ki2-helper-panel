import ky from 'ky'

export const $ky = ky.create({
	prefixUrl: 'http://localhost:8000',
	credentials: 'include',
	mode: 'cors'
})

export const $api = $ky.extend({
	hooks: {
		beforeRequest: [
			request => {
				const token = localStorage.getItem('token')
				request.headers.set('Authorization', `Bearer ${token}`)
			}
		],
		afterResponse: [
			async (request, options, response) => {
				if (response.status === 401) {
					const { token } = await $ky.post('auth/refresh').json()
					localStorage.setItem('token', token)
					request.headers.set('Authorization', `Bearer ${token}`)
					return ky(request)
				}
				return null
			}
		]
	}
})

import ky from 'ky'

export const $ky = ky.create({
	prefixUrl: 'https://ki2-api.deta.dev',
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
		]
	}
})

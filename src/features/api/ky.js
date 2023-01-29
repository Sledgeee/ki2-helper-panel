import ky from 'ky'
import Cookies from 'js-cookie'

export const $ky = ky.create({
	prefixUrl: 'https://ki2-api.deta.dev',
	credentials: 'include',
	mode: 'cors'
})

export const $api = $ky.extend({
	hooks: {
		beforeRequest: [
			request => {
				const token = Cookies.get('token')
				request.headers.set('Authorization', `Bearer ${token}`)
			}
		]
	}
})

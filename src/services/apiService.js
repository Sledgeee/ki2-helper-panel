import { $api } from '../features/api'

export const API_ENDPOINTS = {
	ADMIN: 'admins',
	BIRTHDAY: 'birthdays',
	CRON: 'cron',
	LESSON: 'lessons',
	PLAYLIST: 'playlists',
	SCHEDULE: 'schedule',
	TEACHER: 'teachers',
	TIMETABLE: 'timetable',
	WEEK: 'week'
}

export const ApiService = {
	async getAll(url, prefix = '') {
		const response = await $api.get(`${prefix}${url}/`)
		return { data: await response.json(), status: response.status }
	},

	async createOne(url, json, prefix = '') {
		const response = await $api.post(`${prefix}${url}/`, {
			json
		})
		return { data: await response.json(), status: response.status }
	},

	async updateOne(url, id, json, prefix = '') {
		const response = await $api.put(`${prefix}${url}/${id}/`, {
			json
		})
		return { data: await response.json(), status: response.status }
	},

	async deleteOne(url, id, prefix = '') {
		const response = await $api.delete(`${prefix}${url}/${id}/`)
		return { status: response.status }
	},

	async deleteMany(url, ids, prefix = '') {
		const response = await $api.post(`${prefix}${url}/bulk-delete/`, {
			json: { ids }
		})
		return { status: response.status }
	}
}

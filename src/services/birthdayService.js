import { $api } from '../features/api'

export const BirthdayService = {
	async getAll() {
		const response = $api.get('birthdays/')
		return response.json()
	},

	async updateOne(id, name, date) {
		const response = $api.patch(`birthdays/${id}`, {
			json: { student_name: name, date }
		})
		return response.json()
	},

	async deleteOne(id) {
		const response = $api.delete(`birthdays/${id}`)
		return response.json()
	},

	async deleteMany(ids) {
		const response = $api.post(`birthdays/bulk`, {
			json: { ids }
		})
		return response.json()
	}
}

import { useState } from 'react'
import { DialogContent, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { NewItemModal } from '../components/modal'
import { TablePageLayout } from '../layouts/table-page'
import { API_ENDPOINTS, ApiService } from '../services/apiService'

function descendingComparator(a, b, orderBy) {
	let left
	let right
	switch (orderBy) {
		case 'student_name':
			return b[orderBy].localeCompare(a[orderBy])
		case 'date':
			left = new Date(
				`${a[orderBy][3]}${a[orderBy][4]}.${a[orderBy][0]}${a[orderBy][1]}`
			)
			right = new Date(
				`${b[orderBy][3]}${b[orderBy][4]}.${b[orderBy][0]}${b[orderBy][1]}`
			)
			if (right < left) {
				return -1
			}
			if (right > left) {
				return 1
			}
			return 0
		default:
			return 0
	}
}

export default function BirthdaysPage() {
	const [studentName, setStudentName] = useState('')
	const [date, setDate] = useState('')
	const [snErrored, setSnErrored] = useState(true)
	const [dateErrored, setDateErrored] = useState(true)
	const [refreshTable, setRefreshTable] = useState(false)

	const { t } = useTranslation(['table', 'nav', 'common'])

	const TABLE_HEAD = [
		{ id: 'student_name', label: t('Student'), alignRight: false },
		{ id: 'date', label: t('Date'), alignRight: false },
		{ id: '' }
	]

	const handleStudentNameChange = event => {
		if (!event.target.value) {
			setSnErrored(true)
			return
		}
		if (snErrored) {
			setSnErrored(false)
		}
		setStudentName(event.target.value)
	}

	const handleDateChange = event => {
		if (!event.target.value) {
			setDateErrored(true)
			return
		}
		if (dateErrored) {
			setDateErrored(false)
		}
		setDate(event.target.value)
	}

	const handleCreate = async () => {
		if (snErrored || dateErrored) {
			return 0
		}
		try {
			const { status } = await ApiService.createOne(
				API_ENDPOINTS.BIRTHDAY,
				{
					student_name: studentName,
					date
				},
				'crud/'
			)
			if (status === 201) {
				setRefreshTable(item => !item)
				return 1
			}
			return status
		} catch (e) {
			return -1
		}
	}

	return (
		<TablePageLayout
			fetchEndpoint={API_ENDPOINTS.BIRTHDAY}
			title={t('Birthdays', { ns: 'nav' })}
			tableHead={TABLE_HEAD}
			refreshTable={refreshTable}
			setRefreshTable={setRefreshTable}
			descendingComparator={descendingComparator}
			button={
				<>
					<NewItemModal handleCreate={handleCreate}>
						<DialogContent>
							<TextField
								margin='dense'
								id='student_name'
								label={t('Student')}
								type='text'
								fullWidth
								variant='outlined'
								onChange={handleStudentNameChange}
								error={snErrored}
							/>
							<TextField
								margin='dense'
								id='date'
								label={`${t('Date')} (${t('Example', {
									ns: 'common'
								})}: 25.04)`}
								type='text'
								fullWidth
								variant='outlined'
								onChange={handleDateChange}
								error={dateErrored}
							/>
						</DialogContent>
					</NewItemModal>
				</>
			}
		/>
	)
}

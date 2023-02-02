import { useState } from 'react'
import { DialogContent, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import NewItemModal from '../components/modal/NewItemModal'
import { TablePageLayout } from '../layouts/table-page'
import { API_ENDPOINTS, ApiService } from '../services/apiService'

function descendingComparator(a, b, orderBy) {
	return b[orderBy].localeCompare(a[orderBy])
}

export default function TeachersPage() {
	const [teacherName, setTeacherName] = useState('')
	const [teacherNameErrored, setTeacherNameErrored] = useState(true)
	const [refreshTable, setRefreshTable] = useState(false)

	const { t } = useTranslation(['nav', 'table'])

	const TABLE_HEAD = [
		{ id: 'name', label: t('Teacher', { ns: 'table' }), alignRight: false },
		{ id: '' }
	]

	const handleTeacherNameChange = event => {
		if (!event.target.value) {
			setTeacherNameErrored(true)
			return
		}
		if (teacherNameErrored) {
			setTeacherNameErrored(false)
		}
		setTeacherName(event.target.value)
	}

	const handleCreate = async () => {
		if (teacherNameErrored) {
			return 0
		}
		try {
			const { status } = await ApiService.createOne(
				API_ENDPOINTS.TEACHER,
				{
					name: teacherName
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
			fetchEndpoint={API_ENDPOINTS.TEACHER}
			title={t('Teachers')}
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
								id='teacher_name'
								label={t('Teacher', { ns: 'table' })}
								type='text'
								fullWidth
								variant='outlined'
								onChange={handleTeacherNameChange}
								error={teacherNameErrored}
							/>
						</DialogContent>
					</NewItemModal>
				</>
			}
		/>
	)
}

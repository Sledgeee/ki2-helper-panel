import { useState } from 'react'
import { DialogContent, TextField } from '@mui/material'
import NewItemModal from '../components/modal/NewItemModal'
import { TablePageLayout } from '../layouts/table-page'
import { API_ENDPOINTS, ApiService } from '../services/apiService'

const TABLE_HEAD = [
	{ id: 'name', label: 'Name', alignRight: false },
	{ id: '' }
]

function descendingComparator(a, b, orderBy) {
	return b[orderBy].localeCompare(a[orderBy])
}

export default function TeacherPage() {
	const [teacherName, setTeacherName] = useState('')
	const [teacherNameErrored, setTeacherNameErrored] = useState(true)
	const [refreshTable, setRefreshTable] = useState(false)

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
			title={'Teachers'}
			tableHead={TABLE_HEAD}
			refreshTable={refreshTable}
			setRefreshTable={setRefreshTable}
			descendingComparator={descendingComparator}
			button={
				<>
					<NewItemModal btnText={'New teacher'} handleCreate={handleCreate}>
						<DialogContent>
							<TextField
								autoFocus
								margin='dense'
								id='teacher_name'
								label='Teacher name'
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

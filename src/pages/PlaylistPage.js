import { useState } from 'react'
import { DialogContent, TextField } from '@mui/material'
import NewItemModal from '../components/modal/NewItemModal'
import { TablePageLayout } from '../layouts/table-page'
import { API_ENDPOINTS, ApiService } from '../services/apiService'

const TABLE_HEAD = [
	{ id: 'link', label: 'Playlist link', alignRight: false },
	{ id: '' }
]

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] > a[orderBy]) {
		return -1
	}
	if (b[orderBy] < a[orderBy]) {
		return 1
	}
	return 0
}

export default function BirthdayPage() {
	const [link, setLink] = useState('')
	const [linkErrored, setLinkErrored] = useState(true)
	const [refreshTable, setRefreshTable] = useState(false)

	const handleLinkChange = event => {
		if (!event.target.value) {
			setLinkErrored(true)
			return
		}
		if (linkErrored) {
			setLinkErrored(false)
		}
		setLink(event.target.value)
	}

	const handleCreate = async () => {
		if (linkErrored) {
			return 0
		}
		try {
			const { status } = await ApiService.createOne(
				API_ENDPOINTS.PLAYLIST,
				{
					link
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
			fetchEndpoint={API_ENDPOINTS.PLAYLIST}
			title={'Playlists'}
			tableHead={TABLE_HEAD}
			refreshTable={refreshTable}
			setRefreshTable={setRefreshTable}
			descendingComparator={descendingComparator}
			button={
				<>
					<NewItemModal btnText={'New playlist'} handleCreate={handleCreate}>
						<DialogContent>
							<TextField
								autoFocus
								margin='dense'
								id='link'
								label='Link'
								type='text'
								fullWidth
								variant='outlined'
								onChange={handleLinkChange}
								error={linkErrored}
							/>
						</DialogContent>
					</NewItemModal>
				</>
			}
		/>
	)
}

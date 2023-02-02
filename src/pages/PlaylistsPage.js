import { useState } from 'react'
import { DialogContent, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { NewItemModal } from '../components/modal'
import { TablePageLayout } from '../layouts/table-page'
import { API_ENDPOINTS, ApiService } from '../services/apiService'

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

	const { t } = useTranslation(['table', 'nav'])

	const TABLE_HEAD = [
		{ id: 'link', label: t('Link'), alignRight: false },
		{ id: '' }
	]

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
			title={t('Playlists', { ns: 'nav' })}
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
								label={t('Link')}
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

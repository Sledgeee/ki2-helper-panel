import { useState } from 'react'
import { API_ENDPOINTS } from '../services/apiService'
import { TablePageLayout } from '../layouts/table-page'

const TABLE_HEAD = [
	{ id: 'user_Id', label: 'Telegram User ID', alignRight: false },
	{ id: 'username', label: 'Username', alignRight: false },
	{ id: 'role', label: 'Role', alignRight: false },
	{ id: '' }
]

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] > a[orderBy]) {
		return -1
	}
	if (b[orderBy] < a[orderBy]) {
		return 1
	}
	return 0
}

export default function AdminPage() {
	const [refreshTable, setRefreshTable] = useState(false)

	return (
		<TablePageLayout
			fetchEndpoint={API_ENDPOINTS.ADMIN}
			title={'Admins'}
			tableHead={TABLE_HEAD}
			refreshTable={refreshTable}
			setRefreshTable={setRefreshTable}
			descendingComparator={descendingComparator}
			button={null}
			prefixForUpdateAndDelete={''}
		/>
	)
}

import { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import { Backdrop, CircularProgress } from '@mui/material'
import Iconify from '../iconify'

export default function NewItemModal({ btnText, handleCreate, children }) {
	const [open, setOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<div>
			<Button
				variant='contained'
				startIcon={<Iconify icon='eva:plus-fill' />}
				onClick={handleClickOpen}
			>
				{btnText}
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Create new item</DialogTitle>
				{children}
				{isLoading && (
					<Backdrop
						sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
						open
					>
						<CircularProgress color={'info'} />
					</Backdrop>
				)}
				<DialogActions>
					<Button variant={'outlined'} onClick={handleClose}>
						Cancel
					</Button>
					<Button
						variant={'contained'}
						onClick={async () => {
							setIsLoading(true)
							const status = await handleCreate()
							setIsLoading(false)
							if (status === 1) {
								setOpen(false)
							} else if (status !== 0) {
								console.log(status)
							}
						}}
					>
						Create
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

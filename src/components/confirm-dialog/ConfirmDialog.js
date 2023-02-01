import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'

export default function ConfigDialog({ open, handleClose, handleYes }) {
	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>{'Are you sure you want to delete?'}</DialogTitle>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleYes}>Yes</Button>
			</DialogActions>
		</Dialog>
	)
}

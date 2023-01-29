import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
// @mui
import { alpha } from '@mui/material/styles'
import {
	Avatar,
	Box,
	Divider,
	IconButton,
	MenuItem,
	Popover,
	Typography
} from '@mui/material'
import { useAuth } from '../../../hooks/useAuth'
import { useActions } from '../../../hooks/useActions'
import { useUser } from '../../../hooks/useUser'

export default function AccountPopover() {
	const [open, setOpen] = useState(null)
	const { token } = useAuth()
	const { account } = useUser()
	const { logout } = useActions()
	const navigate = useNavigate()

	const handleOpen = event => {
		setOpen(event.currentTarget)
	}

	const handleClose = () => {
		setOpen(null)
	}

	const handleLogout = () => {
		logout({ token })
		navigate('/login', { replace: true })
	}

	return (
		<>
			<IconButton
				onClick={handleOpen}
				sx={{
					p: 0,
					...(open && {
						'&:before': {
							zIndex: 1,
							content: "''",
							width: '100%',
							height: '100%',
							borderRadius: '50%',
							position: 'absolute',
							bgcolor: theme => alpha(theme.palette.grey[900], 0.8)
						}
					})
				}}
			>
				<Avatar src={account.pic} alt='photoURL' />
			</IconButton>

			<Popover
				open={Boolean(open)}
				anchorEl={open}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				PaperProps={{
					sx: {
						p: 0,
						mt: 1.5,
						ml: 0.75,
						width: 180,
						'& .MuiMenuItem-root': {
							typography: 'body2',
							borderRadius: 0.75
						}
					}
				}}
			>
				<Box sx={{ my: 1.5, px: 2.5 }}>
					<Typography variant='subtitle2' noWrap>
						{account.first_name} {account.last_name}
					</Typography>
					<Typography variant='body2' sx={{ color: 'text.secondary' }} noWrap>
						@{account.username}
					</Typography>
				</Box>

				<Divider sx={{ borderStyle: 'dashed' }} />

				<MenuItem onClick={handleLogout} sx={{ m: 1 }}>
					Logout
				</MenuItem>
			</Popover>
		</>
	)
}

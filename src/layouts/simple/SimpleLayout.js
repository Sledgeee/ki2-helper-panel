import { Suspense } from 'react'
import { Backdrop, CircularProgress } from '@mui/material'
import { Outlet } from 'react-router-dom'
// @mui
import { styled } from '@mui/material/styles'
// components
import Logo from '../../components/logo'
// ----------------------------------------------------------------------

const StyledHeader = styled('header')(({ theme }) => ({
	top: 0,
	left: 0,
	lineHeight: 0,
	width: '100%',
	position: 'absolute',
	padding: theme.spacing(3, 3, 0),
	[theme.breakpoints.up('sm')]: {
		padding: theme.spacing(5, 5, 0)
	}
}))

// ----------------------------------------------------------------------

export default function SimpleLayout() {
	return (
		<>
			<Suspense
				fallback={
					<>
						<Backdrop open>
							<CircularProgress color={'info'} />
						</Backdrop>
					</>
				}
			>
				<StyledHeader>
					<Logo />
				</StyledHeader>

				<Outlet />
			</Suspense>
		</>
	)
}

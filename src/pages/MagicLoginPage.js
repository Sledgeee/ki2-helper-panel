import { Helmet } from 'react-helmet-async'
import { CircularProgress, Container, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useQuery } from '../hooks'
import { AuthService } from '../services/authService'

const StyledContent = styled('div')(({ theme }) => ({
	maxWidth: 480,
	margin: 'auto',
	minHeight: '100vh',
	display: 'flex',
	justifyContent: 'center',
	flexDirection: 'column',
	padding: theme.spacing(12, 0)
}))

const MagicLoginPage = () => {
	const navigate = useNavigate()
	const query = useQuery()
	const [loading, setLoading] = useState(true)
	const [status, setStatus] = useState(null)

	useEffect(() => {
		;(async () => {
			try {
				const { success, user, token } = await AuthService.magicLogin(
					query.get('uid'),
					query.get('um'),
					query.get('otp'),
					query.get('hash_')
				)
				setLoading(false)
				if (success) {
					localStorage.setItem('user', JSON.stringify(user))
					localStorage.setItem('token', token)
					setStatus('success')
					redirect()
				} else {
					setStatus('error')
				}
			} catch (e) {
				setLoading(false)
				setStatus('error')
			}
		})()
	}, [])

	function redirect() {
		setTimeout(() => {
			navigate('/dashboard', { replace: true })
		}, 3000)
	}

	return (
		<>
			<Helmet>
				<title> Magic Login | KI2 Helper </title>
			</Helmet>

			<Container>
				<StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
					{loading && <CircularProgress color={'info'} />}
					{status === 'success' && (
						<>
							<Typography variant='h3' paragraph>
								Login successful ✅
							</Typography>

							<Typography sx={{ color: 'text.secondary' }}>
								You will be redirected in 3 seconds...
							</Typography>
						</>
					)}
					{status === 'error' && (
						<>
							<Typography variant='h3' paragraph>
								Login error ❌
							</Typography>

							<Typography sx={{ color: 'text.secondary' }}>
								Your link seems to be incorrect
							</Typography>
						</>
					)}
				</StyledContent>
			</Container>
		</>
	)
}

export default MagicLoginPage

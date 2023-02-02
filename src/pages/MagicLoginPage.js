import { Helmet } from 'react-helmet-async'
import { CircularProgress, Container, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
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

export default function MagicLoginPage() {
	const navigate = useNavigate()
	const query = useQuery()
	const [loading, setLoading] = useState(true)
	const [status, setStatus] = useState(null)
	const { t } = useTranslation()

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
			navigate('/', { replace: true })
		}, 3000)
	}

	return (
		<>
			<Helmet>
				<title> {t('MagicLogin')} | KI2 Helper </title>
			</Helmet>

			<Container>
				<StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
					{loading && <CircularProgress color={'info'} />}
					{status === 'success' && (
						<>
							<Typography variant='h3' paragraph>
								{t('LoginSuccessful')} ✅
							</Typography>

							<Typography sx={{ color: 'text.secondary' }}>
								{t('WillRedirect')}
							</Typography>
						</>
					)}
					{status === 'error' && (
						<>
							<Typography variant='h3' paragraph>
								{t('LoginError')} ❌
							</Typography>

							<Typography sx={{ color: 'text.secondary' }}>
								{t('LinkIncorrect')}
							</Typography>
						</>
					)}
				</StyledContent>
			</Container>
		</>
	)
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CircularProgress, Stack, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useTranslation } from 'react-i18next'
import { AuthService } from '../../../services/authService'

export default function LoginForm() {
	const navigate = useNavigate()
	const [errored, setErrored] = useState(false)
	const [username, setUsername] = useState('')
	const [userId, setUserId] = useState(null)
	const [otp, setOtp] = useState('')
	const [attemptId, setAttemptId] = useState('')
	const [loginFormVisibility, setLoginFormVisibility] = useState(true)
	const [confirmLoginVisibility, setConfirmLoginVisibility] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const { t } = useTranslation(['common', 'table'])

	const handleUsernameChange = event => {
		if (errored) {
			setErrored(false)
		}
		setUsername(event.target.value)
	}

	const handleOtpChange = event => {
		if (errored) {
			setErrored(false)
		}
		setOtp(event.target.value)
	}

	const handleLoginClick = async () => {
		if (!username) {
			setErrored(true)
			return
		}
		setLoginFormVisibility(false)
		setIsLoading(true)
		const response = await AuthService.tryLogin(username)
		if (response.accepted === true) {
			const { user_id: attemptUserId, attempt_id: attemptId } = response
			setUserId(attemptUserId)
			setAttemptId(attemptId)
			setConfirmLoginVisibility(true)
		}
		setIsLoading(false)
	}

	const handleCheckOtpClick = async () => {
		if (!otp) {
			setErrored(true)
			return
		}
		setConfirmLoginVisibility(false)
		setIsLoading(true)
		const { success, user, token } = await AuthService.checkOtp(
			attemptId,
			userId,
			username,
			otp
		)
		if (success) {
			localStorage.setItem('user', JSON.stringify(user))
			localStorage.setItem('token', token)
			navigate('/', { replace: true })
		} else {
			setErrored(true)
		}
		setIsLoading(false)
	}

	return (
		<>
			{isLoading && (
				<Stack sx={{ alignItems: 'center' }}>
					<CircularProgress color='info' />
				</Stack>
			)}
			{loginFormVisibility && (
				<Stack>
					<p>{t('SignInToDescription')}</p>
					<Stack spacing={3}>
						<TextField
							onChange={handleUsernameChange}
							name='email'
							label={t('Username', { ns: 'table' })}
							error={errored}
						/>
					</Stack>

					<Stack sx={{ my: 3 }}>
						<LoadingButton
							fullWidth
							size='large'
							type='submit'
							variant='contained'
							onClick={handleLoginClick}
						>
							{t('SignIn')}
						</LoadingButton>
					</Stack>
				</Stack>
			)}
			{confirmLoginVisibility && (
				<Stack>
					<p>{t('BotSentMessage')}</p>
					<Stack spacing={3}>
						<TextField
							onChange={handleOtpChange}
							name='otp'
							label='OTP'
							error={errored}
						/>
					</Stack>

					<Stack sx={{ my: 3 }}>
						<LoadingButton
							fullWidth
							size='large'
							type='submit'
							variant='contained'
							onClick={handleCheckOtpClick}
						>
							{t('CheckOTP')}
						</LoadingButton>
					</Stack>
					<b>{t('BotWarn')}</b>
				</Stack>
			)}
		</>
	)
}

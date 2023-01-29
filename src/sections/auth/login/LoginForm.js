import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// @mui
import { CircularProgress, Stack, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useActions } from '../../../hooks/useActions'
import { AuthService } from '../../../services/authService'

// ----------------------------------------------------------------------

export default function LoginForm() {
	const navigate = useNavigate()

	const { login, profile } = useActions()
	const [errored, setErrored] = useState(false)
	const [username, setUsername] = useState('')
	const [userId, setUserId] = useState(null)
	const [otp, setOtp] = useState('')
	const [attemptId, setAttemptId] = useState('')
	const [loginFormVisibility, setLoginFormVisibility] = useState(true)
	const [confirmLoginVisibility, setConfirmLoginVisibility] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

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
			otp
		)
		if (success) {
			login({ token })
			profile({ account: user })
			navigate('/dashboard', { replace: true })
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
					<p>Enter your username specified during registration in the bot</p>
					<Stack spacing={3}>
						<TextField
							onChange={handleUsernameChange}
							name='email'
							label='Username'
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
							Login
						</LoadingButton>
					</Stack>
				</Stack>
			)}
			{confirmLoginVisibility && (
				<Stack>
					<p>
						The bot sent you an OTP to confirm your login via a private message
						in the Telegram
					</p>
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
							Check OTP
						</LoadingButton>
					</Stack>
					<b>
						If you don't receive the notification, try refreshing the page and
						trying again
					</b>
				</Stack>
			)}
		</>
	)
}

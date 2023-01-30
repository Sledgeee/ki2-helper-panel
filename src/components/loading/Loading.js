import { Suspense } from 'react'
import { Backdrop, CircularProgress } from '@mui/material'

const Loading = ({ children }) => {
	return (
		<Suspense
			fallback={
				<>
					<Backdrop open>
						<CircularProgress color={'info'} />
					</Backdrop>
				</>
			}
		>
			{children}
		</Suspense>
	)
}

export default Loading

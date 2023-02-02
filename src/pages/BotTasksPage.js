import { Helmet } from 'react-helmet-async'
import { Container, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { AppTasks } from '../sections/@dashboard/app'

export default function BotTasksPage() {
	const { t } = useTranslation('nav')

	return (
		<>
			<Helmet>
				<title> {t('BotTasks')} | KI2 Helper </title>
			</Helmet>

			<Container maxWidth='xl'>
				<Typography variant='h4' sx={{ mb: 5 }}>
					{t('BotTasks')}
				</Typography>

				<Grid container spacing={3}>
					<Grid item xs={12} md={6} lg={8}>
						<AppTasks />
					</Grid>
				</Grid>
			</Container>
		</>
	)
}

import { Helmet } from 'react-helmet-async'
import { faker } from '@faker-js/faker'
import { Container, Grid, Typography } from '@mui/material'
import {
	AppNewsUpdate,
	AppOrderTimeline,
	AppTasks,
	AppWidgetSummary
} from '../sections/@dashboard/app'

export default function DashboardPage() {
	return (
		<>
			<Helmet>
				<title> Dashboard | KI2 Helper </title>
			</Helmet>

			<Container maxWidth='xl'>
				<Typography variant='h4' sx={{ mb: 5 }}>
					Hi, Welcome back
				</Typography>

				<Grid container spacing={3}>
					<Grid item xs={12} sm={6} md={3}>
						<AppWidgetSummary
							title='Weekly Sales'
							total={714000}
							icon={'ant-design:android-filled'}
						/>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<AppWidgetSummary
							title='New Users'
							total={1352831}
							color='info'
							icon={'ant-design:apple-filled'}
						/>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<AppWidgetSummary
							title='Item Orders'
							total={1723315}
							color='warning'
							icon={'ant-design:windows-filled'}
						/>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<AppWidgetSummary
							title='Bug Reports'
							total={234}
							color='error'
							icon={'ant-design:bug-filled'}
						/>
					</Grid>

					<Grid item xs={12} md={6} lg={8}>
						<AppNewsUpdate
							title='News Update'
							list={[...Array(5)].map((_, index) => ({
								id: faker.datatype.uuid(),
								title: faker.name.jobTitle(),
								description: faker.name.jobTitle(),
								image: `/assets/images/covers/cover_${index + 1}.jpg`,
								postedAt: faker.date.recent()
							}))}
						/>
					</Grid>

					<Grid item xs={12} md={6} lg={4}>
						<AppOrderTimeline
							title='Order Timeline'
							list={[...Array(5)].map((_, index) => ({
								id: faker.datatype.uuid(),
								title: [
									'1983, orders, $4220',
									'12 Invoices have been paid',
									'Order #37745 from September',
									'New order placed #XF-2356',
									'New order placed #XF-2346'
								][index],
								type: `order${index + 1}`,
								time: faker.date.past()
							}))}
						/>
					</Grid>

					<Grid item xs={12} md={6} lg={8}>
						<AppTasks
							title='Tasks'
							list={[
								{ id: '1', label: 'Create FireStone Logo' },
								{ id: '2', label: 'Add SCSS and JS files if required' },
								{ id: '3', label: 'Stakeholder Meeting' },
								{ id: '4', label: 'Scoping & Estimations' },
								{ id: '5', label: 'Sprint Showcase' }
							]}
						/>
					</Grid>
				</Grid>
			</Container>
		</>
	)
}

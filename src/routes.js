import { Navigate, useRoutes } from 'react-router-dom'
import { lazy } from 'react'

import DashboardLayout from './layouts/dashboard'
import SimpleLayout from './layouts/simple'

import { ProtectedRoute } from './components/protected-route'
import { Loading } from './components/loading'

const DashboardAppPage = lazy(() => import('./pages/DashboardAppPage'))
const BirthdayPage = lazy(() => import('./pages/BirthdayPage'))
const TeacherPage = lazy(() => import('./pages/TeacherPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const MagicLoginPage = lazy(() => import('./pages/MagicLoginPage'))
const Page404 = lazy(() => import('./pages/Page404'))

// ----------------------------------------------------------------------
export default function Router() {
	return useRoutes([
		{
			path: '/dashboard',
			element: (
				<ProtectedRoute isLoggedIn={localStorage.getItem('token')}>
					<DashboardLayout />
				</ProtectedRoute>
			),
			children: [
				{ element: <Navigate to='/dashboard/app' />, index: true },
				{
					path: 'app',
					element: (
						<Loading>
							<DashboardAppPage />
						</Loading>
					)
				},
				{
					path: 'birthdays',
					element: (
						<Loading>
							<BirthdayPage />
						</Loading>
					)
				},
				{
					path: 'teachers',
					element: (
						<Loading>
							<TeacherPage />
						</Loading>
					)
				}
			]
		},
		{
			path: 'login',
			element: (
				<Loading>
					<LoginPage />
				</Loading>
			)
		},
		{
			element: <SimpleLayout />,
			children: [
				{ element: <Navigate to='/dashboard/app' />, index: true },
				{
					path: '404',
					element: (
						<Loading>
							<Page404 />
						</Loading>
					)
				},
				{
					path: 'magic-login',
					element: (
						<Loading>
							<MagicLoginPage />
						</Loading>
					)
				},
				{ path: '*', element: <Navigate to='/404' /> }
			]
		},
		{
			path: '*',
			element: <Navigate to='/404' replace />
		}
	])
}

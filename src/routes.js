import { Navigate, useRoutes } from 'react-router-dom'
import { lazy } from 'react'
import Cookies from 'js-cookie'
// layouts
import DashboardLayout from './layouts/dashboard'
import SimpleLayout from './layouts/simple'
//
import LoginPage from './pages/LoginPage'
import Page404 from './pages/Page404'
import { ProtectedRoute } from './components/protected-route'

const DashboardAppPage = lazy(() => import('./pages/DashboardAppPage'))
const BirthdayPage = lazy(() => import('./pages/BirthdayPage'))
const TeacherPage = lazy(() => import('./pages/TeacherPage'))

// ----------------------------------------------------------------------
export default function Router() {
	return useRoutes([
		{
			path: '/dashboard',
			element: (
				<ProtectedRoute isLoggedIn={Cookies.get('AUTH')}>
					<DashboardLayout />
				</ProtectedRoute>
			),
			children: [
				{ element: <Navigate to='/dashboard/app' />, index: true },
				{ path: 'app', element: <DashboardAppPage /> },
				{
					path: 'birthdays',
					element: <BirthdayPage />
				},
				{
					path: 'teachers',
					element: <TeacherPage />
				}
			]
		},
		{
			path: 'login',
			element: <LoginPage />
		},
		{
			element: <SimpleLayout />,
			children: [
				{ element: <Navigate to='/dashboard/app' />, index: true },
				{ path: '404', element: <Page404 /> },
				{ path: '*', element: <Navigate to='/404' /> }
			]
		},
		{
			path: '*',
			element: <Navigate to='/404' replace />
		}
	])
}

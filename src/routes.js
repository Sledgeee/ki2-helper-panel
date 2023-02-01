import { Navigate, useRoutes } from 'react-router-dom'
import { lazy } from 'react'

import DashboardLayout from './layouts/dashboard'
import SimpleLayout from './layouts/simple'

import { ProtectedRoute } from './components/protected-route'
import { Loading } from './components/loading'

const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const AdminPage = lazy(() => import('./pages/AdminPage'))
const BirthdayPage = lazy(() => import('./pages/BirthdayPage'))
const TeacherPage = lazy(() => import('./pages/TeacherPage'))
const PlaylistPage = lazy(() => import('./pages/PlaylistPage'))
const LessonPage = lazy(() => import('./pages/LessonPage'))
const SchedulePage = lazy(() => import('./pages/SchedulePage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const MagicLoginPage = lazy(() => import('./pages/MagicLoginPage'))
const Page404 = lazy(() => import('./pages/Page404'))

// ----------------------------------------------------------------------
export default function Router() {
	return useRoutes([
		{
			path: '/',
			element: (
				<ProtectedRoute isLoggedIn={localStorage.getItem('token')}>
					<DashboardLayout />
				</ProtectedRoute>
			),
			children: [
				{ element: <Navigate to='/dashboard' />, index: true },
				{
					path: '/dashboard',
					element: (
						<Loading>
							<DashboardPage />
						</Loading>
					)
				},
				{
					path: '/admins',
					element: (
						<Loading>
							<AdminPage />
						</Loading>
					)
				},
				{
					path: '/birthdays',
					element: (
						<Loading>
							<BirthdayPage />
						</Loading>
					)
				},
				{
					path: '/teachers',
					element: (
						<Loading>
							<TeacherPage />
						</Loading>
					)
				},
				{
					path: '/lessons',
					element: (
						<Loading>
							<LessonPage />
						</Loading>
					)
				},
				{
					path: '/playlists',
					element: (
						<Loading>
							<PlaylistPage />
						</Loading>
					)
				},
				{
					path: '/schedule',
					element: (
						<Loading>
							<SchedulePage />
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
				{ element: <Navigate to='/dashboard' />, index: true },
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

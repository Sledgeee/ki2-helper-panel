import { Navigate, useRoutes } from 'react-router-dom'
import { lazy } from 'react'

import DashboardLayout from './layouts/dashboard'
import SimpleLayout from './layouts/simple'

import { ProtectedRoute } from './components/protected-route'
import { Loading } from './components/loading'

const BotTasksPage = lazy(() => import('./pages/BotTasksPage'))
const AdminsPage = lazy(() => import('./pages/AdminsPage'))
const BirthdaysPage = lazy(() => import('./pages/BirthdaysPage'))
const TeachersPage = lazy(() => import('./pages/TeachersPage'))
const PlaylistsPage = lazy(() => import('./pages/PlaylistsPage'))
const LessonsPage = lazy(() => import('./pages/LessonsPage'))
const SchedulePage = lazy(() => import('./pages/SchedulePage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const MagicLoginPage = lazy(() => import('./pages/MagicLoginPage'))
const Page404 = lazy(() => import('./pages/Page404'))

export default function Router() {
	return useRoutes([
		{
			path: '/',
			element: (
				<Loading>
					<ProtectedRoute isLoggedIn={localStorage.getItem('token')}>
						<DashboardLayout />
					</ProtectedRoute>
				</Loading>
			),
			children: [
				{ element: <Navigate to='/bot-tasks' />, index: true },
				{
					path: '/bot-tasks',
					element: (
						<Loading>
							<BotTasksPage />
						</Loading>
					)
				},
				{
					path: '/admins',
					element: (
						<Loading>
							<AdminsPage />
						</Loading>
					)
				},
				{
					path: '/birthdays',
					element: (
						<Loading>
							<BirthdaysPage />
						</Loading>
					)
				},
				{
					path: '/teachers',
					element: (
						<Loading>
							<TeachersPage />
						</Loading>
					)
				},
				{
					path: '/lessons',
					element: (
						<Loading>
							<LessonsPage />
						</Loading>
					)
				},
				{
					path: '/playlists',
					element: (
						<Loading>
							<PlaylistsPage />
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
				{ element: <Navigate to='/bot-tasks' />, index: true },
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

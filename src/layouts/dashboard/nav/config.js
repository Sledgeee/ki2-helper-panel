// component
import SvgColor from '../../../components/svg-color'

// ----------------------------------------------------------------------

const icon = name => (
	<SvgColor
		src={`/assets/icons/navbar/${name}.svg`}
		sx={{ width: 24, height: 24 }}
	/>
)

const navConfig = [
	{
		title: 'dashboard',
		path: '/dashboard',
		icon: icon('dashboard')
	},
	{
		title: 'admins',
		path: '/admins',
		icon: icon('admins')
	},
	{
		title: 'birthdays',
		path: '/birthdays',
		icon: icon('birthdays')
	},
	{
		title: 'teachers',
		path: '/teachers',
		icon: icon('teachers')
	},
	{
		title: 'lessons',
		path: '/lessons',
		icon: icon('lessons')
	},
	{
		title: 'playlists',
		path: '/playlists',
		icon: icon('playlists')
	},
	{
		title: 'schedule',
		path: '/schedule',
		icon: icon('schedule')
	}
]

export default navConfig

import SvgColor from '../../../components/svg-color'

const icon = name => (
	<SvgColor
		src={`/assets/icons/navbar/${name}.svg`}
		sx={{ width: 24, height: 24 }}
	/>
)

const navConfig = [
	{
		title: 'BotTasks',
		path: '/bot-tasks',
		icon: icon('tasks')
	},
	{
		title: 'Admins',
		path: '/admins',
		icon: icon('admins')
	},
	{
		title: 'Birthdays',
		path: '/birthdays',
		icon: icon('birthdays')
	},
	{
		title: 'Teachers',
		path: '/teachers',
		icon: icon('teachers')
	},
	{
		title: 'Lessons',
		path: '/lessons',
		icon: icon('lessons')
	},
	{
		title: 'Playlists',
		path: '/playlists',
		icon: icon('playlists')
	},
	{
		title: 'Schedule',
		path: '/schedule',
		icon: icon('schedule')
	}
]

export default navConfig

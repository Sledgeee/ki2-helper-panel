// component
import SvgColor from '../../../components/svg-color'

// ----------------------------------------------------------------------

const icon = name => (
	<SvgColor
		src={`/assets/icons/navbar/${name}.svg`}
		sx={{ width: 1, height: 1 }}
	/>
)

const navConfig = [
	{
		title: 'dashboard',
		path: '/dashboard/app',
		icon: icon('ic_analytics')
	},
	{
		title: 'birthdays',
		path: '/dashboard/birthdays',
		icon: icon('ic_user')
	},
	{
		title: 'teachers',
		path: '/dashboard/teachers',
		icon: icon('ic_user')
	}
]

export default navConfig

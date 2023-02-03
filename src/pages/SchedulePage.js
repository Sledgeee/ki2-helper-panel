import { useEffect, useState } from 'react'
import {
	DialogContent,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { API_ENDPOINTS, ApiService } from '../services/apiService'
import { NewItemModal } from '../components/modal'
import { TablePageLayout } from '../layouts/table-page'

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] > a[orderBy]) {
		return -1
	}
	if (b[orderBy] < a[orderBy]) {
		return 1
	}
	return 0
}

export default function SchedulePage() {
	const [day, setDay] = useState('Понеділок')
	const [dayNumber, setDayNumber] = useState(1)
	const [number, setNumber] = useState(null)
	const [cabinet, setCabinet] = useState('')
	const [weekType, setWeekType] = useState('-')
	const [lessonId, setLessonId] = useState('')
	const [lessons, setLessons] = useState([])
	const [numberErrored, setNumberErrored] = useState(true)
	const [cabinetErrored, setCabinetErrored] = useState(true)
	const [refreshTable, setRefreshTable] = useState(false)

	useEffect(() => {
		;(async () => {
			const { data, status } = await ApiService.getAll(
				API_ENDPOINTS.LESSON,
				'crud/'
			)
			if (status === 200 && data.length > 0) {
				setLessons(data)
				setLessonId(data[0]._id)
			}
		})()
	}, [])

	const WEEK_TYPES = ['Чисельник', 'Знаменник', '-']
	const DAYS = {
		'Понеділок': 1,
		'Вівторок': 2,
		'Середа': 3,
		'Четвер': 4,
		"П'ятниця": 5
	}

	const { t } = useTranslation('table')
	const TABLE_HEAD = [
		{ id: 'day', label: t('Day'), alignRight: false },
		{ id: 'day_number', label: t('DayNumber'), alignRight: false },
		{ id: 'number', label: t('Number'), alignRight: false },
		{ id: 'week_type', label: t('WeekType'), alignRight: false },
		{ id: 'cabinet', label: t('Audience'), alignRight: false },
		{ id: 'lesson', label: t('Lesson'), alignRight: false },
		{ id: '' }
	]

	const handleNumberChange = event => {
		if (!event.target.value) {
			setNumberErrored(true)
			return
		}
		if (numberErrored) {
			setNumberErrored(false)
		}
		setNumber(event.target.value)
	}

	const handleCabinetChange = event => {
		if (!event.target.value) {
			setCabinetErrored(true)
			return
		}
		if (cabinetErrored) {
			setCabinetErrored(false)
		}
		setCabinet(event.target.value)
	}

	const handleCreate = async () => {
		if (numberErrored) {
			return 0
		}
		try {
			const lesson = lessons.find(x => x._id === lessonId)
			const { status } = await ApiService.createOne(
				API_ENDPOINTS.SCHEDULE,
				{
					day,
					day_number: dayNumber,
					number: parseInt(number, 10),
					week_type: weekType,
					cabinet,
					lesson
				},
				'crud/'
			)
			if (status === 201) {
				setRefreshTable(item => !item)
				return 1
			}
			return status
		} catch (e) {
			return -1
		}
	}

	return (
		<>
			<TablePageLayout
				fetchEndpoint={API_ENDPOINTS.SCHEDULE}
				prefixForFetch={''}
				title={t('ScheduleItems')}
				tableHead={TABLE_HEAD}
				refreshTable={refreshTable}
				setRefreshTable={setRefreshTable}
				descendingComparator={descendingComparator}
				colsSpan={7}
				button={
					<>
						<NewItemModal handleCreate={handleCreate}>
							<DialogContent>
								<FormControl id={'day'} margin={'dense'} fullWidth>
									<InputLabel id='day-label'>{t('Day')}</InputLabel>
									<Select
										labelId={'day-label'}
										label={t('Day')}
										value={day}
										onChange={e => {
											setDay(e.target.value)
											setDayNumber(DAYS[e.target.value])
										}}
									>
										{Object.keys(DAYS).map((value, index) => (
											<MenuItem key={`d${index}`} value={value}>
												{value}
											</MenuItem>
										))}
									</Select>
								</FormControl>
								<TextField
									margin='dense'
									label={t('Number')}
									type='number'
									fullWidth
									variant='outlined'
									onChange={handleNumberChange}
									error={numberErrored}
								/>
								<FormControl id={'week-type'} margin={'dense'} fullWidth>
									<InputLabel id='week-type-label'>{t('WeekType')}</InputLabel>
									<Select
										labelId={'week-type-label'}
										label={t('WeekType')}
										value={weekType}
										onChange={e => {
											setWeekType(e.target.value)
										}}
									>
										{WEEK_TYPES.map((value, index) => (
											<MenuItem key={`wt${index}`} value={value}>
												{value}
											</MenuItem>
										))}
									</Select>
								</FormControl>
								<TextField
									margin='dense'
									label={t('Audience')}
									type='text'
									fullWidth
									variant='outlined'
									onChange={handleCabinetChange}
									error={cabinetErrored}
								/>
								<FormControl id={'lesson'} margin={'dense'} fullWidth>
									<InputLabel id='lesson-label'>{t('Lesson')}</InputLabel>
									<Select
										labelId={'lesson-label'}
										label={t('Lesson')}
										value={lessonId}
										onChange={e => {
											setLessonId(e.target.value)
										}}
									>
										{lessons.map((value, index) => (
											<MenuItem key={`l${index}`} value={value._id}>
												{value.short_name} {value.type}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</DialogContent>
						</NewItemModal>
					</>
				}
			/>
		</>
	)
}

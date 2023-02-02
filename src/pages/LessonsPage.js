import { useEffect, useState } from 'react'
import {
	Button,
	Checkbox,
	DialogContent,
	FormControl,
	FormControlLabel,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography
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

export default function LessonsPage() {
	const [name, setName] = useState('')
	const [shortName, setShortName] = useState('')
	const [types, setTypes] = useState([true, false, false])
	const [teachers, setTeachers] = useState(['', '', ''])
	const [zooms, setZooms] = useState(['', '', ''])

	const [nameErrored, setNameErrored] = useState(true)
	const [shortNameErrored, setShortNameErrored] = useState(true)
	const [refreshTable, setRefreshTable] = useState(true)
	const [teacherList, setTeacherList] = useState([])

	const { t } = useTranslation(['table', 'nav'])

	const TABLE_HEAD = [
		{ id: 'name', label: t('LessonName'), alignRight: false },
		{ id: 'short_name', label: t('LessonShortName'), alignRight: false },
		{ id: 'type', label: t('Type'), alignRight: false },
		{ id: 'teacher', label: t('Teacher'), alignRight: false },
		{ id: 'zoom', label: 'Zoom', alignRight: false },
		{ id: '' }
	]

	const TYPES = ['пр.', 'лаб.', 'лекц.']

	useEffect(() => {
		;(async () => {
			let { data } = await ApiService.getAll(API_ENDPOINTS.TEACHER, 'crud/')
			data = data.sort((a, b) => {
				return a.name.localeCompare(b.name)
			})
			setTeacherList(data)
			setTeachers([data[0].name, data[0].name, data[0].name])
		})()
	}, [])

	const handleNameChange = event => {
		if (!event.target.value) {
			setNameErrored(true)
			return
		}
		if (nameErrored) {
			setNameErrored(false)
		}
		setName(event.target.value)
	}

	const handleShortNameChange = event => {
		if (!event.target.value) {
			setShortNameErrored(true)
			return
		}
		if (shortNameErrored) {
			setShortNameErrored(false)
		}
		setShortName(event.target.value)
	}

	const handleCreate = async () => {
		if (nameErrored || shortNameErrored) {
			return 0
		}
		if (!types[0] && !types[1] && !types[2]) {
			return 0
		}
		try {
			const promises = []
			for (let i = 0; i < 3; i += 1) {
				if (types[i]) {
					/* eslint-disable no-await-in-loop */
					promises.push(
						ApiService.createOne(
							API_ENDPOINTS.LESSON,
							{
								name,
								short_name: shortName,
								type: TYPES[i],
								teacher: teachers[i],
								zoom: zooms[i]
							},
							'crud/'
						)
					)
				}
			}
			await Promise.all(promises)
			setRefreshTable(item => !item)
			return 1
		} catch (e) {
			return -1
		}
	}

	return (
		<TablePageLayout
			fetchEndpoint={API_ENDPOINTS.LESSON}
			title={t('Lessons', { ns: 'nav' })}
			tableHead={TABLE_HEAD}
			refreshTable={refreshTable}
			setRefreshTable={setRefreshTable}
			descendingComparator={descendingComparator}
			colsSpan={6}
			button={
				<>
					<NewItemModal handleCreate={handleCreate}>
						<DialogContent>
							<TextField
								margin='dense'
								id='name'
								label={t('LessonName')}
								type='text'
								fullWidth
								variant='outlined'
								onChange={handleNameChange}
								error={nameErrored}
							/>
							<TextField
								margin='dense'
								id='short_name'
								label={t('LessonShortName')}
								type='text'
								fullWidth
								variant='outlined'
								onChange={handleShortNameChange}
								error={shortNameErrored}
							/>
							<>
								{TYPES.map((value, index) => (
									<Stack key={index}>
										<FormControlLabel
											control={
												<Checkbox
													checked={types[index]}
													onChange={() => {
														const copy = types
														copy[index] = !copy[index]
														setTypes([...copy])
													}}
												/>
											}
											label={value}
										/>
										{types[index] && (
											<>
												<FormControl
													id={`form${index}`}
													margin={'dense'}
													fullWidth
												>
													<InputLabel id={`teacher-label${index}`}>
														Teacher
													</InputLabel>
													<Select
														labelId={`teacher-label${index}`}
														label='teacher'
														value={teachers[index]}
														onChange={e => {
															const copy = teachers
															copy[index] = e.target.value
															setTeachers([...copy])
														}}
													>
														{teacherList.map((value, index) => (
															<MenuItem key={index} value={value.name}>
																{value.name}
															</MenuItem>
														))}
													</Select>
												</FormControl>
												<TextField
													margin='dense'
													label='Zoom'
													type='text'
													fullWidth
													variant='outlined'
													value={zooms[index]}
													onChange={e => {
														const copy = zooms
														copy[index] = e.target.value
														setZooms([...copy])
													}}
												/>
												<Button
													variant={'outlined'}
													sx={{ my: 1, textTransform: 'none' }}
													onClick={() => {
														const teachersCopy = teachers
														const zoomsCopy = zooms
														for (let i = 0; i < 3; i += 1) {
															teachersCopy[i] = teachers[index]
															zoomsCopy[i] = zooms[index]
														}
														setTeachers([...teachersCopy])
														setZooms([...zoomsCopy])
													}}
												>
													{t('CopyToOther')}
												</Button>
											</>
										)}
									</Stack>
								))}
							</>
						</DialogContent>
						<Stack sx={{ px: 3, py: 1 }}>
							<Typography>{''}</Typography>
						</Stack>
					</NewItemModal>
				</>
			}
		/>
	)
}

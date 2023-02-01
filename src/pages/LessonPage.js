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
import { API_ENDPOINTS, ApiService } from '../services/apiService'
import NewItemModal from '../components/modal/NewItemModal'
import { TablePageLayout } from '../layouts/table-page'

const TABLE_HEAD = [
	{ id: 'name', label: 'Name', alignRight: false },
	{ id: 'short_name', label: 'Short Name', alignRight: false },
	{ id: 'type', label: 'Type', alignRight: false },
	{ id: 'teacher', label: 'Teacher', alignRight: false },
	{ id: 'zoom', label: 'Zoom', alignRight: false },
	{ id: '' }
]

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] > a[orderBy]) {
		return -1
	}
	if (b[orderBy] < a[orderBy]) {
		return 1
	}
	return 0
}

export default function LessonPage() {
	const [name, setName] = useState('')
	const [shortName, setShortName] = useState('')
	const [types, setTypes] = useState([true, false, false])
	const [teachers, setTeachers] = useState(['', '', ''])
	const [zooms, setZooms] = useState(['', '', ''])
	const [sameInfo, setSameInfo] = useState(false)

	const [nameErrored, setNameErrored] = useState(true)
	const [shortNameErrored, setShortNameErrored] = useState(true)
	const [refreshTable, setRefreshTable] = useState(true)
	const [teacherList, setTeacherList] = useState([])

	const strTypes = ['пр.', 'лаб.', 'лекц.']

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
								type: strTypes[i],
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
			title={'Lessons'}
			tableHead={TABLE_HEAD}
			refreshTable={refreshTable}
			setRefreshTable={setRefreshTable}
			descendingComparator={descendingComparator}
			button={
				<>
					<NewItemModal btnText={'New lesson'} handleCreate={handleCreate}>
						<DialogContent>
							<TextField
								autoFocus
								margin='dense'
								id='name'
								label='Name'
								type='text'
								fullWidth
								variant='outlined'
								onChange={handleNameChange}
								error={nameErrored}
							/>
							<TextField
								margin='dense'
								id='short_name'
								label='Short name'
								type='text'
								fullWidth
								variant='outlined'
								onChange={handleShortNameChange}
								error={shortNameErrored}
							/>
							{!sameInfo && (
								<>
									<Typography typography={'subtitle1'} sx={{ mt: 1 }}>
										Types
									</Typography>
									{strTypes.map((value, index) => (
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
													<FormControl id={'form3'} margin={'dense'} fullWidth>
														<InputLabel id='teacher-label3'>Teacher</InputLabel>
														<Select
															labelId={'teacher-label3'}
															id='teacher3'
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
														id='zoom'
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
														sx={{ my: 1 }}
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
														Copy to other
													</Button>
												</>
											)}
										</Stack>
									))}
								</>
							)}
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

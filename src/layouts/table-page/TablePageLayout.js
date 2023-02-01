import { Helmet } from 'react-helmet-async'
import * as React from 'react'
import { useEffect, useState } from 'react'
import {
	Card,
	Checkbox,
	CircularProgress,
	Container,
	IconButton,
	MenuItem,
	Paper,
	Popover,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TablePagination,
	TableRow,
	Typography
} from '@mui/material'
import { filter } from 'lodash'
import Iconify from '../../components/iconify'
import Scrollbar from '../../components/scrollbar'
import ListHead from '../../sections/@dashboard/table/ListHead'
import ListToolbar from '../../sections/@dashboard/table/ListToolbar'
import { ApiService } from '../../services/apiService'
import { ConfirmDialog } from '../../components/confirm-dialog'

export default function TestPageLayout({
	fetchEndpoint,
	refreshTable,
	setRefreshTable,
	title,
	descendingComparator,
	button,
	tableHead,
	prefixForUpdateAndDelete = 'crud/'
}) {
	const [open, setOpen] = useState(null)
	const [confirmMenuOpen, setConfirmMenuOpen] = useState(false)
	const [currentOpenedMenuId, setCurrentOpenedMenuId] = useState('')
	const [page, setPage] = useState(0)
	const [order, setOrder] = useState('asc')
	const [selected, setSelected] = useState([])
	const [orderBy, setOrderBy] = useState('name')
	const [filterName, setFilterName] = useState('')
	const [rowsPerPage, setRowsPerPage] = useState(20)
	const [data, setData] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [fetchError, setFetchError] = useState(false)

	useEffect(() => {
		;(async () => {
			setIsLoading(true)
			try {
				const { data, status } = await ApiService.getAll(fetchEndpoint, 'crud/')
				if (status === 200) {
					setData(data)
				}
			} catch (e) {
				setFetchError(true)
			}
			setIsLoading(false)
		})()
	}, [refreshTable])

	function getComparator(order, orderBy) {
		return order === 'desc'
			? (a, b) => descendingComparator(a, b, orderBy)
			: (a, b) => -descendingComparator(a, b, orderBy)
	}

	function applySortFilter(array, comparator, query) {
		const stabilizedThis = array.map((el, index) => [el, index])
		stabilizedThis.sort((a, b) => {
			const order = comparator(a[0], b[0])
			if (order !== 0) return order
			return a[1] - b[1]
		})
		if (query) {
			return filter(array, _item => {
				const values = Object.values(_item)
				/* eslint-disable no-restricted-syntax */
				for (const value of values) {
					if (value.toLowerCase().indexOf(query.toLowerCase()) > -1) {
						return true
					}
				}
				return false
			})
		}
		return stabilizedThis.map(el => el[0])
	}

	const handleOpenMenu = (event, id) => {
		setCurrentOpenedMenuId(id)
		setOpen(event.currentTarget)
	}

	const handleCloseMenu = () => {
		setOpen(null)
	}

	const handleOpenConfirmMenu = () => {
		handleCloseMenu()
		setConfirmMenuOpen(true)
	}

	const handleCloseConfirmMenu = () => {
		setConfirmMenuOpen(false)
	}

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	const handleSelectAllClick = event => {
		if (event.target.checked) {
			const newSelecteds = data.map(n => n._id)
			setSelected(newSelecteds)
			return
		}
		setSelected([])
	}

	const handleClick = (event, id) => {
		const selectedIndex = selected.indexOf(id)
		let newSelected = []
		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id)
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1))
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1))
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			)
		}
		setSelected(newSelected)
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = event => {
		setPage(0)
		setRowsPerPage(parseInt(event.target.value, 10))
	}

	const handleFilterByName = event => {
		setPage(0)
		setFilterName(event.target.value)
	}

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0

	const filteredData = applySortFilter(
		data,
		getComparator(order, orderBy),
		filterName
	)

	const handleDeleteMany = async () => {
		await ApiService.deleteMany(
			fetchEndpoint,
			selected,
			prefixForUpdateAndDelete
		)
		setSelected([])
		setRefreshTable(value => !value)
	}

	const handleDeleteOne = async () => {
		await ApiService.deleteOne(
			fetchEndpoint,
			currentOpenedMenuId,
			prefixForUpdateAndDelete
		)
		handleCloseConfirmMenu()
		setRefreshTable(value => !value)
	}

	const isNotFound = !filteredData.length && !!filterName

	return (
		<>
			<Helmet>
				<title> {title} | KI2 Helper </title>
			</Helmet>

			<Container>
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='space-between'
					mb={5}
				>
					<Typography variant='h4' gutterBottom>
						{title}
					</Typography>
					{button}
				</Stack>

				<Card>
					<ListToolbar
						numSelected={selected.length}
						filterName={filterName}
						onFilterName={handleFilterByName}
						handleDelete={handleDeleteMany}
					/>

					<Scrollbar>
						<TableContainer sx={{ minWidth: 800 }}>
							<Table>
								<ListHead
									order={order}
									orderBy={orderBy}
									headLabel={tableHead}
									rowCount={data.length}
									numSelected={selected.length}
									onRequestSort={handleRequestSort}
									onSelectAllClick={handleSelectAllClick}
								/>
								{isLoading ? (
									<TableBody>
										<TableRow>
											<TableCell align='center' colSpan={6} sx={{ py: 3 }}>
												<CircularProgress color='info' />
											</TableCell>
										</TableRow>
									</TableBody>
								) : (
									<TableBody>
										{filteredData
											.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage
											)
											.map(row => {
												const { _id: id } = row
												const values = Object.values(row)
												values.shift()
												const selectedItem = selected.indexOf(id) !== -1

												return (
													<TableRow
														hover
														id={id}
														key={id}
														tabIndex={-1}
														role='checkbox'
														selected={selectedItem}
													>
														<TableCell padding='checkbox'>
															<Checkbox
																checked={selectedItem}
																onChange={event => handleClick(event, id)}
															/>
														</TableCell>

														{values.map(value => (
															<TableCell key={value} align='left'>
																{value}
															</TableCell>
														))}

														<TableCell align='right'>
															<IconButton
																size='large'
																color='inherit'
																onClick={event => handleOpenMenu(event, id)}
															>
																<Iconify icon={'eva:more-vertical-fill'} />
															</IconButton>
														</TableCell>
													</TableRow>
												)
											})}
										{emptyRows > 0 && (
											<TableRow style={{ height: 53 * emptyRows }}>
												<TableCell colSpan={6} />
											</TableRow>
										)}
									</TableBody>
								)}

								{isNotFound && (
									<TableBody>
										<TableRow>
											<TableCell align='center' colSpan={6} sx={{ py: 3 }}>
												<Paper
													sx={{
														textAlign: 'center'
													}}
												>
													<Typography variant='h6' paragraph>
														Not found
													</Typography>

													<Typography variant='body2'>
														No results found for &nbsp;
														<strong>&quot;{filterName}&quot;</strong>.
														<br /> Try checking for typos or using complete
														words.
													</Typography>
												</Paper>
											</TableCell>
										</TableRow>
									</TableBody>
								)}

								{fetchError && (
									<TableBody>
										<TableRow>
											<TableCell align='center' colSpan={6} sx={{ py: 3 }}>
												<Paper
													sx={{
														textAlign: 'center'
													}}
												>
													<Typography variant='h6' paragraph>
														Fetch error
													</Typography>

													<Typography variant='body2'>
														It looks like the API is temporarily unavailable or
														an error occurred while trying to retrieve data
													</Typography>
												</Paper>
											</TableCell>
										</TableRow>
									</TableBody>
								)}
								{!fetchError && !isLoading && !data.length && (
									<TableBody>
										<TableRow>
											<TableCell align='center' colSpan={6} sx={{ py: 3 }}>
												<Paper
													sx={{
														textAlign: 'center'
													}}
												>
													<Typography variant='h6' paragraph>
														Empty
													</Typography>

													<Typography variant='body2'>
														It looks like the database is empty
													</Typography>
												</Paper>
											</TableCell>
										</TableRow>
									</TableBody>
								)}
							</Table>
						</TableContainer>
					</Scrollbar>

					<TablePagination
						rowsPerPageOptions={[10, 20, 50, 100]}
						component='div'
						count={data.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Card>
			</Container>

			<ConfirmDialog
				open={confirmMenuOpen}
				handleClose={handleCloseConfirmMenu}
				handleYes={handleDeleteOne}
			/>

			<Popover
				open={Boolean(open)}
				anchorEl={open}
				onClose={handleCloseMenu}
				anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				PaperProps={{
					sx: {
						p: 1,
						width: 140,
						'& .MuiMenuItem-root': {
							px: 1,
							typography: 'body2',
							borderRadius: 0.75
						}
					}
				}}
			>
				<MenuItem>
					<Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
					Edit
				</MenuItem>

				<MenuItem sx={{ color: 'error.main' }} onClick={handleOpenConfirmMenu}>
					<Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
					Delete
				</MenuItem>
			</Popover>
		</>
	)
}

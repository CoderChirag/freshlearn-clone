import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
	Grid,
	Typography,
	Button,
	Paper,
	Box,
	Avatar,
	Divider,
	Menu,
	MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';

import { CoursesContext } from '../../../contexts/courses/courses.context';
import { Link } from 'react-router-dom';

const CustomPaper = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	color: theme.palette.text.secondary,
	// height: 60,
	marginTop: '20px',
	marginRight: '20px',
	borderTopLeftRadius: '5px',
	borderTopRightRadius: '5px',
	// lineHeight: '60px',
}));

const CoursesList = () => {
	// We  can fetch the courses data from backend here using a useEffect hook and then update it to courses context using setAllCoursesData method of the context.
	const { courses, deleteCourse, cloneCourse } = useContext(CoursesContext);
	// State for menu of every card
	const [menuState, setMenuState] = React.useState({});

	// Handle menu state for every card
	const handleMenuOpen = (e, courseId) => {
		setMenuState({
			...menuState,
			[courseId]: { open: true, target: e.currentTarget },
		});
	};
	const handleMenuClose = courseId => {
		setMenuState({
			...menuState,
			[courseId]: { open: false, target: null },
		});
	};

	// Menu Options handlers
	const handleDeleteCourse = courseId => {
		deleteCourse(courseId);
		handleMenuClose(courseId);
	};
	const handleCloneCourse = courseId => {
		cloneCourse({
			...courses.find(course => course.id === courseId),
			id: uuidv4(),
		});
		handleMenuClose(courseId);
	};

	return (
		<>
			<Grid container flexDirection='column'>
				<Grid
					item
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<Typography
						variant='h5'
						sx={{ fontWeight: '600', minHeight: '5vh' }}
					>
						Courses
					</Typography>
					<Link
						to='/dashboard/products/courses/add-course'
						style={{ textDecoration: 'none' }}
					>
						<Button variant='contained'>Create Course</Button>
					</Link>
				</Grid>
				<Grid item sx={{ minHeight: '80vh' }}>
					{courses.length > 0 ? (
						<Grid container sx={{ paddingRight: '30px' }}>
							{courses.map(course => (
								<Grid
									key={course.id}
									item
									sx={{ width: '28%', cursor: 'pointer' }}
								>
									<CustomPaper elevation={8}>
										<Link
											to={`/dashboard/products/courses/${course.id}/curriculum`}
											style={{
												textDecoration: 'none',
												color: 'inherit',
											}}
										>
											<Box
												sx={{
													width: '100%',
													height: '25vh',
													backgroundImage: `url('https://mdbootstrap.com/img/Photos/Others/images/43.jpg')`,
													backgroundRepeat:
														'no-repeat',
													backgroundSize: 'cover',
													backgroundPosition:
														'center',
													borderTopLeftRadius: '5px',
													borderTopRightRadius: '5px',
												}}
											></Box>
											<Box
												sx={{
													overflow: 'hidden',
													width: '100%',
													minHeight: '18vh',
													maxHeight: '50vh',
													padding: '10px 20px',
												}}
											>
												<Typography variant='h6'>
													{course.title}
												</Typography>
												<Typography variant='p'>
													{course.description}
												</Typography>
												<Grid
													container
													justifyContent='space-between'
													sx={{ marginTop: '25px' }}
												>
													<Grid item>
														<Avatar
															sx={{
																backgroundColor:
																	'#2C3E50',
																width: 32,
																height: 32,
															}}
														>
															{course.author[0].toUpperCase()}
														</Avatar>
													</Grid>
													<Grid item>
														<Typography variant='h6'>
															FREE
														</Typography>
													</Grid>
												</Grid>
											</Box>
										</Link>
										<Box sx={{ padding: '10px 20px' }}>
											<Divider />
											<Grid
												container
												justifyContent='space-between'
												alignItems='center'
												sx={{
													marginTop: '10px',
												}}
											>
												<Typography
													variant='p'
													color='red'
													fontWeight={600}
												>
													Draft
												</Typography>
												<Button
													id={`course-menu-button-${course.id}`}
													aria-controls={
														menuState[course.id]
															?.open
															? `course-menu-${course.id}`
															: undefined
													}
													aria-haspopup='true'
													aria-expanded={
														menuState[course.id]
															?.open
															? 'true'
															: undefined
													}
													onClick={e =>
														handleMenuOpen(
															e,
															course.id
														)
													}
													variant='text'
													size='small'
													sx={{
														color: 'inherit',
														minWidth: '0px',
													}}
												>
													<MoreVertOutlinedIcon />
												</Button>
												<Menu
													id={`course-menu-${course.id}`}
													anchorEl={
														menuState[course.id]
															?.target
													}
													open={
														menuState[course.id]
															?.open || false
													}
													onClose={() =>
														handleMenuClose(
															course.id
														)
													}
													MenuListProps={{
														'aria-labelledby': `course-menu-button-${course.id}`,
													}}
												>
													<MenuItem
														onClick={() =>
															handleMenuClose(
																course.id
															)
														}
													>
														<ModeEditOutlineOutlinedIcon />
														<Typography
															variant='p'
															sx={{
																marginLeft:
																	'10px',
															}}
														>
															Edit
														</Typography>
													</MenuItem>
													<MenuItem
														onClick={() =>
															handleDeleteCourse(
																course.id
															)
														}
													>
														<DeleteOutlineOutlinedIcon />
														<Typography
															variant='p'
															sx={{
																marginLeft:
																	'10px',
															}}
														>
															Delete
														</Typography>
													</MenuItem>
													<MenuItem
														onClick={() =>
															handleCloneCourse(
																course.id
															)
														}
													>
														<FileCopyOutlinedIcon />
														<Typography
															variant='p'
															sx={{
																marginLeft:
																	'10px',
															}}
														>
															Clone
														</Typography>
													</MenuItem>
												</Menu>
											</Grid>
										</Box>
									</CustomPaper>
								</Grid>
							))}
						</Grid>
					) : (
						<Grid
							container
							flexDirection='column'
							justifyContent='center'
							alignItems='center'
							sx={{ minHeight: '60vh' }}
						>
							<Grid item sx={{ width: '30%' }}>
								<img
									src='https://cdn.freshlms.info/icons/freshlms_empty.png'
									alt='create course'
									style={{ maxWidth: '100%' }}
								/>
							</Grid>
							<Grid item>
								<Link
									to='/dashboard/products/courses/add-course'
									style={{ textDecoration: 'none' }}
								>
									<Button variant='contained'>
										Create Course
									</Button>
								</Link>
							</Grid>
						</Grid>
					)}
				</Grid>
			</Grid>
		</>
	);
};

export default CoursesList;

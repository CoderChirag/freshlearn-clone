import React, { useContext } from 'react';
import { Grid, Typography, Button, Paper, Box, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';

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
	const { courses } = useContext(CoursesContext);

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
									<Link
										to={`/dashboard/products/courses/${course.id}/curriculum`}
										style={{ textDecoration: 'none' }}
									>
										<CustomPaper elevation={8}>
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
													minHeight: '25vh',
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
										</CustomPaper>
									</Link>
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

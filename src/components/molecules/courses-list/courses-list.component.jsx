import React, { useContext } from 'react';
import { Grid, Typography, Button } from '@mui/material';

import { CoursesContext } from '../../../contexts/courses/courses.context';
import { Link } from 'react-router-dom';

const CoursesList = () => {
	// We  can fetch the courses data from backend here using a useEffect hook and then update it to courses context using setAllCoursesData method of the context.
	const { courses } = useContext(CoursesContext);

	return (
		<>
			<Grid container flexDirection='column'>
				<Grid item>
					<Typography
						variant='h5'
						sx={{ fontWeight: '600', minHeight: '5vh' }}
					>
						Courses
					</Typography>
				</Grid>
				<Grid item sx={{ minHeight: '80vh' }}>
					{courses.length > 0 ? (
						'All Courses'
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

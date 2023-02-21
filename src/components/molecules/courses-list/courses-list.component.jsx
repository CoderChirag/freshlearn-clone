import React, { useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';

const CoursesList = () => {
	const [courses, setCourses] = useState([]);

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
								<Button variant='contained'>
									Create Course
								</Button>
							</Grid>
						</Grid>
					)}
				</Grid>
			</Grid>
		</>
	);
};

export default CoursesList;

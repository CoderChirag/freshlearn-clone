import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';

import ModuleConfigurator from '../module-configurator/module-configurator.component';
import { CoursesContext } from '../../../contexts/courses/courses.context';

const Curriculum = () => {
	// All courses data
	const { courses } = useContext(CoursesContext);
	// Current Course Id
	const { courseId } = useParams();

	// Current Course State
	const [course, setCourse] = useState(null);

	// Get current course data
	useEffect(() => {
		setCourse(courses.find(course => course.id === courseId));
	}, [setCourse, courses, courseId]);

	return (
		<Grid
			container
			justifyContent='space-between'
			sx={{ height: '100%', paddingTop: '10px' }}
		>
			<ModuleConfigurator />
			<Grid
				item
				xs={8}
				sx={{
					height: '100%',
					overflowX: 'hidden',
					overflowY: 'auto',
					// boxShadow:
					// 	'0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
				}}
			>
				<Paper></Paper>
			</Grid>
		</Grid>
	);
};

export default Curriculum;

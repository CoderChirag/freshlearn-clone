import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';

import CourseIdBar from '../../atoms/course-id-bar/course-id-bar.component';
import { CoursesContext } from '../../../contexts/courses/courses.context';

const CoursePage = () => {
	const { courses, setCoursesDataFromStorage } = useContext(CoursesContext);
	const location = useLocation();
	const { courseId } = useParams();

	const [course, setCourse] = useState({});

	useEffect(() => {
		if (courses.length === 0) {
			setCoursesDataFromStorage();
		}
	}, []);

	useEffect(() => {
		const course = courses.find(course => course.id === courseId);
		setCourse(course);
	}, [courseId, courses]);

	return (
		<Grid container flexDirection='column'>
			<CourseIdBar title={course?.title} id={course?.id} />
		</Grid>
	);
};

export default CoursePage;

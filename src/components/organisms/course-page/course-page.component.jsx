import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid, Typography, Paper, Tab, Tabs } from '@mui/material';

import CourseIdBar from '../../atoms/course-id-bar/course-id-bar.component';
import { CoursesContext } from '../../../contexts/courses/courses.context';
import TabsComponent from '../../molecules/tabs/tabs.component';

const CoursePage = () => {
	const { courses, setCoursesDataFromStorage } = useContext(CoursesContext);
	const location = useLocation();
	const { courseId } = useParams();

	// Current Course State
	const [course, setCourse] = useState({});

	// This data can also be fetched from backend if we want to make it dynamic also in future
	const tabs = [
		{
			key: 1,
			title: 'Curriculum',
			location: /\/courses\/[0-9]+\/curriculum\/*$/i,
			link: `dashboard/products/courses/${courseId}/curriculum`,
		},
		{
			key: 2,
			title: 'Pricing',
			location: /\/courses\/[0-9]+\/pricing\/*$/i,
			link: `dashboard/products/courses/${courseId}/pricing`,
		},
		{
			key: 3,
			title: 'Pages',
			location: /\/courses\/[0-9]+\/pages\/*$/i,
			link: `dashboard/products/courses/${courseId}/pages`,
		},
		{
			key: 4,
			title: 'Drip',
			location: /\/courses\/[0-9]+\/drip\/*$/i,
			link: `dashboard/products/courses/${courseId}/drip`,
		},
		{
			key: 5,
			title: 'Certificate',
			location: /\/courses\/[0-9]+\/certificate\/*$/i,
			link: `dashboard/products/courses/${courseId}/certificate`,
		},
		{
			key: 6,
			title: 'Gamification',
			location: /\/courses\/[0-9]+\/gamification\/*$/i,
			link: `dashboard/products/courses/${courseId}/gamification`,
		},
	];

	// For transferring data from local storage in case of a refresh
	useEffect(() => {
		if (courses.length === 0) {
			setCoursesDataFromStorage();
		}
	}, []);

	// For setting the current course
	useEffect(() => {
		const course = courses.find(course => course.id === courseId);
		setCourse(course);
	}, [courseId, courses]);

	return (
		<Grid container flexDirection='column'>
			<CourseIdBar title={course?.title} id={course?.id} />
			<Paper elevation={4} sx={{ marginTop: '10px' }}></Paper>
			<TabsComponent
				tabs={tabs}
				active={location.pathname.split('/').indexOf(courseId) + 1}
			/>
		</Grid>
	);
};

export default CoursePage;

import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';

import CourseIdBar from '../../atoms/course-id-bar/course-id-bar.component';
import { CoursesContext } from '../../../contexts/courses/courses.context';
import TabsComponent from '../../molecules/tabs/tabs.component';
import Curriculum from '../../molecules/curriculum/curriculum.component';

const TabSection = ({ title }) => {
	return <div>{title}</div>;
};

const CoursePage = () => {
	const { courses, setCoursesDataFromStorage } = useContext(CoursesContext);
	const location = useLocation();
	const { courseId } = useParams();

	// Current Course State
	const [course, setCourse] = useState({});

	// This data can also be fetched from backend if we want to make it dynamic also in future
	const tabs = [
		{
			key: 0,
			title: 'Curriculum',
			location: /\/courses\/[0-9]+\/curriculum\/*$/i,
			link: `/dashboard/products/courses/${courseId}/curriculum`,
			component: <Curriculum title='Curriculum' />,
		},
		{
			key: 1,
			title: 'Pricing',
			location: /\/courses\/[0-9]+\/pricing\/*$/i,
			link: `/dashboard/products/courses/${courseId}/pricing`,
			component: <TabSection title='Pricing' />,
		},
		{
			key: 2,
			title: 'Pages',
			location: /\/courses\/[0-9]+\/pages\/*$/i,
			link: `/dashboard/products/courses/${courseId}/pages`,
			component: <TabSection title='Pages' />,
		},
		{
			key: 3,
			title: 'Drip',
			location: /\/courses\/[0-9]+\/drip\/*$/i,
			link: `/dashboard/products/courses/${courseId}/drip`,
			component: <TabSection title='Drip' />,
		},
		{
			key: 4,
			title: 'Certificate',
			location: /\/courses\/[0-9]+\/certificate\/*$/i,
			link: `/dashboard/products/courses/${courseId}/certificate`,
			component: <TabSection title='Certificate' />,
		},
		{
			key: 5,
			title: 'Gamification',
			location: /\/courses\/[0-9]+\/gamification\/*$/i,
			link: `/dashboard/products/courses/${courseId}/gamification`,
			component: <TabSection title='Gamification' />,
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
		<Grid
			container
			flexDirection='column'
			sx={{ width: '100%', height: '100%' }}
		>
			<CourseIdBar
				title={course?.title}
				id={course?.id}
				sx={{ height: '10%' }}
			/>
			<Paper elevation={4} sx={{ marginTop: '10px' }}></Paper>
			<TabsComponent
				tabs={tabs}
				active={
					tabs.find(
						tab =>
							location.pathname
								.split('/')
								[
									location.pathname
										.split('/')
										.indexOf(courseId) + 1
								].trim()
								.toLowerCase() === tab.title.toLowerCase()
					).key
				}
			/>
		</Grid>
	);
};

export default CoursePage;

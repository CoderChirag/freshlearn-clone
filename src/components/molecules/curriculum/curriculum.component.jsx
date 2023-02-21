import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';

import ModuleConfigurator from '../module-configurator/module-configurator.component';
import ChapterConfigurator from '../chapter-configurator/chapter-configurator.component';
import { CoursesContext } from '../../../contexts/courses/courses.context';

const Curriculum = () => {
	// All courses data
	const { courses } = useContext(CoursesContext);
	// Current Course Id
	const { courseId } = useParams();

	// Current Course State
	const [course, setCourse] = useState(null);
	const [activeChapter, setActiveChapter] = useState(null);

	// Get current course data
	useEffect(() => {
		setCourse(courses.find(course => course.id === courseId));
	}, [setCourse, courses, courseId]);

	useEffect(() => {
		if (course && !activeChapter) {
			setActiveChapter(course?.modules[0]?.chapters[0]);
		}
	}, [course, activeChapter, setActiveChapter]);

	return (
		<Grid
			container
			justifyContent='space-between'
			sx={{ height: '100%', paddingTop: '10px' }}
		>
			<ModuleConfigurator
				activeChapter={activeChapter}
				activeChapterHandler={setActiveChapter}
			/>
			<ChapterConfigurator chapter={activeChapter} />
		</Grid>
	);
};

export default Curriculum;

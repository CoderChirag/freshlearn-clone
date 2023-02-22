import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';

import ModuleConfigurator from '../module-configurator/module-configurator.component';
import ChapterConfigurator from '../chapter-configurator/chapter-configurator.component';
import { CoursesContext } from '../../../contexts/courses/courses.context';

const Curriculum = () => {
	// All courses data
	const { courses, editChapter } = useContext(CoursesContext);
	// Current Course Id
	const { courseId } = useParams();

	// Current Course State
	const [course, setCourse] = useState(null);
	const [activeModule, setActiveModule] = useState(null);
	const [activeChapter, setActiveChapter] = useState(null);

	// Chapter Edit Handler
	const handleChapterEdit = chapterData => {
		console.log(chapterData);
		setActiveChapter(chapterData);
		editChapter(courseId, activeModule.id, activeChapter.id, chapterData);
	};

	// Get current course data
	useEffect(() => {
		setCourse(courses.find(course => course.id === courseId));
	}, [setCourse, courses, courseId]);

	useEffect(() => {
		if (course && !activeChapter) {
			setActiveModule(course?.modules[0]);
			setActiveChapter(course?.modules[0]?.chapters[0]);
		}
	}, [activeChapter, course, setActiveChapter]);

	return (
		<Grid
			container
			justifyContent='space-between'
			sx={{ height: '100%', paddingTop: '10px' }}
		>
			<ModuleConfigurator
				activeChapter={activeChapter}
				activeModule={activeModule}
				activeChapterHandler={setActiveChapter}
				activeModuleHandler={setActiveModule}
			/>
			<ChapterConfigurator
				chapter={activeChapter}
				chapterEditHandler={handleChapterEdit}
			/>
		</Grid>
	);
};

export default Curriculum;

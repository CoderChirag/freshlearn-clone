import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useChapterControls = (course, courseId, addNewChapter) => {
	// State for Chapters visibility
	const [chaptersVisible, setChaptersVisible] = useState({});
	// State for Add Chapter Input
	const [addChapterInputState, setaddChapterInputState] = useState({});

	// Chapters visibility handler
	const toggleChaptersVisibility = moduleId => {
		setChaptersVisible({
			...chaptersVisible,
			[moduleId]: !chaptersVisible[moduleId],
		});
		if (
			chaptersVisible[moduleId] &&
			addChapterInputState[moduleId]?.inputVisibility
		) {
			toggleAddChapterInputVisibility(moduleId);
		}
	};

	// Add Chapter Input state handlers
	const toggleAddChapterInputVisibility = moduleId => {
		setaddChapterInputState({
			...addChapterInputState,
			[moduleId]: {
				inputVisibility:
					!addChapterInputState[moduleId]?.inputVisibility,
				input: addChapterInputState[moduleId]?.input || '',
			},
		});
	};
	const handleAddChapterInputChange = (moduleId, e) => {
		setaddChapterInputState({
			...addChapterInputState,
			[moduleId]: {
				inputVisibility:
					addChapterInputState[moduleId]?.inputVisibility,
				input: e.target.value,
			},
		});
	};
	const clearAddChapterInputs = () => {
		setaddChapterInputState(prev => {
			const newState = {};
			Object.keys(prev).forEach(key => {
				newState[key] = {
					inputVisibility: false,
					input: '',
				};
			});
			return newState;
		});
	};
	// Clearing the input field when the course changes
	useEffect(() => {
		clearAddChapterInputs();
	}, [course]);

	// Handler for adding new chapter
	// Here we can put our post request to the server
	const handleAddChapter = moduleId => {
		const newChapter = {
			id: uuidv4(),
			title: addChapterInputState[moduleId].input,
		};
		console.log(newChapter);
		addNewChapter(courseId, moduleId, newChapter);
		toggleAddChapterInputVisibility(moduleId);
	};

	return {
		toggleChaptersVisibility,
		chaptersVisible,
		toggleAddChapterInputVisibility,
		handleAddChapterInputChange,
		addChapterInputState,
		handleAddChapter,
	};
};

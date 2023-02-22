import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useModuleControls = (courseId, addNewModule) => {
	// State for Add Modules Input
	const [addModuleInputState, setAddModuleInputState] = useState({
		visible: false,
		input: '',
	});

	// Add Module Input State Handlers
	const toggleAddModuleInputVisibility = () => {
		setAddModuleInputState(prev => ({
			visible: !prev.visible,
			input: prev.input,
		}));
	};
	const handleAddModuleInputChange = e => {
		setAddModuleInputState({
			visible: true,
			input: e.target.value,
		});
	};
	useEffect(() => {
		if (!addModuleInputState.visible) {
			setAddModuleInputState({ visible: false, input: '' });
		}
	}, [addModuleInputState.visible]);

	// Handler for adding new module
	// Here we can put our post request to the server
	const handleAddModule = () => {
		const newModule = {
			id: uuidv4(),
			title: addModuleInputState.input,
			chapters: [
				{
					id: uuidv4(),
					title: 'Chapter 1',
				},
			],
		};
		console.log('Module Added Successfully');
		console.log(newModule);
		addNewModule(courseId, newModule);
		setAddModuleInputState({ visible: false, input: '' });
	};

	return {
		toggleAddModuleInputVisibility,
		handleAddModuleInputChange,
		addModuleInputState,
		handleAddModule,
	};
};

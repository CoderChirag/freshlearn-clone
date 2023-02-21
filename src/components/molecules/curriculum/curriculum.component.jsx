import React, { Fragment, useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Grid, Paper, Typography, Button, TextField, Box } from '@mui/material';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { CoursesContext } from '../../../contexts/courses/courses.context';

const Curriculum = () => {
	// All courses data
	const { courses, addNewChapter, addNewModule } = useContext(CoursesContext);
	// Current Course Id
	const { courseId } = useParams();

	// Current Course State
	const [course, setCourse] = useState(null);
	// State for Add Modules Input
	const [addModuleInputState, setAddModuleInputState] = useState({
		visible: false,
		input: '',
	});
	// State for Chapters visibility
	const [chaptersVisible, setChaptersVisible] = useState({});
	// State for Add Chapter Input
	const [addChapterInputState, setaddChapterInputState] = useState({});

	// Get current course data
	useEffect(() => {
		setCourse(courses.find(course => course.id === courseId));
	}, [setCourse, courses, courseId]);

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

	// Submit handlers

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
		console.log(newModule);
		addNewModule(courseId, newModule);
		setAddModuleInputState({ visible: false, input: '' });
	};

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

	return (
		<Grid
			container
			justifyContent='space-between'
			sx={{ height: '100%', paddingTop: '10px' }}
		>
			<Grid
				item
				xs={3.5}
				sx={{
					height: '100%',
					overflowX: 'hidden',
					overflowY: 'auto',
					// boxShadow:
					// 	'0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
				}}
			>
				{course?.modules.map(module => (
					<Fragment key={module.id}>
						<Paper
							elevation={4}
							sx={{
								padding: '15px 15px',
								cursor: 'pointer',
								backgroundColor: chaptersVisible[module.id]
									? '#F0F6FF'
									: 'white',
								borderLeft: chaptersVisible[module.id]
									? '4px solid #2c7bf7!important'
									: 'none',
								marginTop: '20px',
								'&:hover .MuiTypography-root': {
									color: 'blue',
								},
							}}
							onClick={() => toggleChaptersVisibility(module.id)}
						>
							<Grid
								container
								alignItems='center'
								justifyContent={'space-between'}
							>
								<Grid
									container
									sx={{
										width: 'max-content',
									}}
								>
									<Grid item>
										<img
											src='https://cdn.freshlms.info/icons/svg__images/freshlms_drag_icon.svg'
											alt='dots'
											style={{
												position: 'relative',
												top: '2.5px',
												marginRight: '10px',
											}}
										></img>
									</Grid>
									<Grid item>
										<Typography
											variant='p'
											sx={{
												position: 'relative',
												top: '2.5px',
											}}
										>
											{module.title}
										</Typography>
									</Grid>
								</Grid>
								<Grid item>
									{chaptersVisible[module.id] ? (
										<KeyboardArrowUpOutlinedIcon
											sx={{
												position: 'relative',
												top: '2.5px',
											}}
										/>
									) : (
										<KeyboardArrowDownOutlinedIcon
											sx={{
												position: 'relative',
												top: '2.5px',
											}}
										/>
									)}
								</Grid>
							</Grid>
						</Paper>
						{chaptersVisible[module.id] &&
							module?.chapters.map(chapter => (
								<Paper
									key={chapter.id}
									elevation={4}
									sx={{
										padding: '15px 15px',
										cursor: 'pointer',
										backgroundColor: '#F0F6FF',
										'&:hover .MuiTypography-root': {
											color: 'blue',
										},
									}}
								>
									<Grid
										container
										alignItems='center'
										justifyContent={'space-between'}
									>
										<Grid
											container
											sx={{ width: 'max-content' }}
										>
											<Grid item>
												<img
													src='https://cdn.freshlms.info/icons/svg__images/freshlms_drag_icon.svg'
													alt='dots'
													style={{
														position: 'relative',
														top: '2.5px',
														marginRight: '10px',
													}}
												></img>
											</Grid>
											<Grid item>
												<Typography
													variant='p'
													sx={{
														position: 'relative',
														top: '2.5px',
													}}
												>
													{chapter.title}
												</Typography>
											</Grid>
										</Grid>
										<Grid item>
											<LockOutlinedIcon
												sx={{
													position: 'relative',
													top: '2.5px',
												}}
											/>
										</Grid>
									</Grid>
								</Paper>
							))}
						{addChapterInputState[module.id]?.inputVisibility && (
							<Grid
								container
								justifyContent='space-between'
								alignItems='center'
							>
								<TextField
									id={`add-chapter-${module.id}`}
									label='Add Chapter'
									variant='outlined'
									size='small'
									sx={{
										marginTop: '30px',
										backgroundColor: '#fff',
										width: '80%',
									}}
									value={
										addChapterInputState[module.id]
											?.input || ''
									}
									onChange={e =>
										handleAddChapterInputChange(
											module.id,
											e
										)
									}
								/>
								<Button
									variant='contained'
									sx={{
										marginTop: '30px',
										width: '40px',
										minWidth: 'unset',
									}}
									disabled={
										!addChapterInputState[module.id]?.input
									}
									onClick={() => handleAddChapter(module.id)}
								>
									<DoneOutlinedIcon />
								</Button>
							</Grid>
						)}
						{chaptersVisible[module.id] && (
							<Button
								variant='contained'
								sx={{ marginTop: '30px', width: '100%' }}
								onClick={() =>
									toggleAddChapterInputVisibility(module.id)
								}
							>
								Add Chapter
							</Button>
						)}
					</Fragment>
				))}
				<Box
					sx={{
						padding: '15px 15px',
						backgroundColor: '#fff',
						marginTop: '30px',
						'&:hover .MuiTypography-root': {
							color: 'blue',
						},
					}}
				>
					{addModuleInputState?.visible && (
						<Grid
							container
							justifyContent='space-between'
							alignItems='center'
						>
							<TextField
								id='add-module'
								label='Add Module'
								variant='outlined'
								size='small'
								sx={{
									backgroundColor: '#fff',
									width: '80%',
								}}
								value={addModuleInputState?.input || ''}
								onChange={handleAddModuleInputChange}
							/>
							<Button
								variant='contained'
								sx={{
									width: '40px',
									minWidth: 'unset',
								}}
								disabled={!addModuleInputState?.input}
								onClick={handleAddModule}
							>
								<DoneOutlinedIcon />
							</Button>
						</Grid>
					)}
					<Button
						variant='outlined'
						sx={{ marginTop: '30px' }}
						onClick={toggleAddModuleInputVisibility}
					>
						<AddOutlinedIcon />
						<Typography variant='p'>Add Module</Typography>
					</Button>
				</Box>
			</Grid>
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

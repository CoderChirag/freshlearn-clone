import React, { Fragment, useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
	Grid,
	Paper,
	Typography,
	Button,
	TextField,
	Box,
	Menu,
	MenuItem,
} from '@mui/material';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
// import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';

import { useModuleControls } from './useModuleControls.hook';
import { useChapterControls } from './useChapterControls.hook';
import { CoursesContext } from '../../../contexts/courses/courses.context';

const ModuleConfigurator = ({
	activeChapter,
	activeModule,
	activeChapterHandler,
	activeModuleHandler,
}) => {
	// All courses data
	const {
		courses,
		addNewChapter,
		addNewModule,
		deleteModule,
		cloneModule,
		deleteChapter,
		cloneChapter,
	} = useContext(CoursesContext);
	// Current Course Id
	const { courseId } = useParams();

	// Current Course State
	const [course, setCourse] = useState(null);
	// State for menu of every card
	const [menuState, setMenuState] = React.useState({});
	// Module Controls
	const {
		toggleAddModuleInputVisibility,
		handleAddModuleInputChange,
		addModuleInputState,
		handleAddModule,
	} = useModuleControls(courseId, addNewModule);

	// Chapter Controls
	const {
		toggleChaptersVisibility,
		chaptersVisible,
		toggleAddChapterInputVisibility,
		handleAddChapterInputChange,
		addChapterInputState,
		handleAddChapter,
	} = useChapterControls(course, courseId, addNewChapter);

	// Get current course data
	useEffect(() => {
		setCourse(courses.find(course => course.id === courseId));
	}, [setCourse, courses, courseId]);

	// Handle menu state for every card
	const handleMenuOpen = (e, id) => {
		setMenuState({
			...menuState,
			[id]: { open: true, target: e.currentTarget },
		});
	};
	const handleMenuClose = id => {
		setMenuState({
			...menuState,
			[id]: { open: false, target: null },
		});
	};

	// Menu Options handlers
	const handleDeleteModule = moduleId => {
		// Here we can make a DELETE request to backend to delete the course
		console.log(`Module (ID: ${moduleId}) Deleted Successfully`);
		deleteModule(courseId, moduleId);
		handleMenuClose(moduleId);
	};
	const handleCloneModule = moduleId => {
		// Here we can make a POST request to backend to clone the course
		let moduleData = {
			...course.modules.find(module => module.id === moduleId),
			id: uuidv4(),
		};
		console.log(`Module (ID: ${moduleId}) Cloned Successfully`);
		console.log(moduleData);
		cloneModule(courseId, moduleData);
		handleMenuClose(moduleId);
	};
	const handleDeleteChapter = (moduleId, chapterId) => {
		// Here we can make a DELETE request to backend to delete the course
		console.log(`Chapter (ID: ${chapterId}) Deleted Successfully`);
		deleteChapter(courseId, moduleId, chapterId);
		handleMenuClose(chapterId);
	};
	const handleCloneChapter = (moduleId, chapterId) => {
		// Here we can make a POST request to backend to clone the course
		let chapterData = {
			...course.modules
				.find(module => module.id === moduleId)
				.chapters.find(chapter => chapter.id === chapterId),
			id: uuidv4(),
		};
		console.log(`Chapter (ID: ${chapterId}) Cloned Successfully`);
		console.log(chapterData);
		cloneChapter(courseId, moduleId, chapterData);
		handleMenuClose(moduleId);
	};

	useEffect(() => {
		if (
			!course?.modules.find(module => module.id === activeModule?.id) ||
			!course?.modules
				.find(module => module.id === activeModule?.id)
				.chapters.find(chapter => chapter.id === activeChapter?.id)
		) {
			activeChapterHandler(null);
			activeModuleHandler(null);
		}
	}, [
		course,
		activeChapterHandler,
		activeModuleHandler,
		activeChapter,
		activeModule,
	]);

	return (
		<Grid
			item
			xs={3.5}
			sx={{
				height: '100%',
				overflowX: 'hidden',
				overflowY: 'auto',
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
							<Grid item>
								<Button
									id={`module-menu-button-${module.id}`}
									aria-controls={
										menuState[module.id]?.open
											? `module-menu-${module.id}`
											: undefined
									}
									aria-haspopup='true'
									aria-expanded={
										menuState[module.id]?.open
											? 'true'
											: undefined
									}
									onClick={e => handleMenuOpen(e, module.id)}
									variant='text'
									size='small'
									sx={{
										color: 'inherit',
										minWidth: '0px',
									}}
								>
									<MoreVertOutlinedIcon />
								</Button>
								<Menu
									id={`module-menu-${module.id}`}
									anchorEl={menuState[module.id]?.target}
									open={menuState[module.id]?.open || false}
									onClose={() => handleMenuClose(module.id)}
									MenuListProps={{
										'aria-labelledby': `course-menu-button-${module.id}`,
									}}
								>
									{/* <MenuItem
										onClick={() => {
											navigate(
												`/dashboard/products/courses/edit-course/${module.id}`
											);
										}}
									>
										<ModeEditOutlineOutlinedIcon />
										<Typography
											variant='p'
											sx={{
												marginLeft: '10px',
											}}
										>
											Edit
										</Typography>
									</MenuItem> */}
									<MenuItem
										onClick={() =>
											handleDeleteModule(module.id)
										}
									>
										<DeleteOutlineOutlinedIcon />
										<Typography
											variant='p'
											sx={{
												marginLeft: '10px',
											}}
										>
											Delete
										</Typography>
									</MenuItem>
									<MenuItem
										onClick={() =>
											handleCloneModule(module.id)
										}
									>
										<FileCopyOutlinedIcon />
										<Typography
											variant='p'
											sx={{
												marginLeft: '10px',
											}}
										>
											Clone
										</Typography>
									</MenuItem>
								</Menu>
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
									backgroundColor:
										chapter.id === activeChapter?.id
											? '#F0F6FF'
											: '#fff',
									'&:hover .MuiTypography-root': {
										color: 'blue',
									},
								}}
								onClick={() => {
									activeModuleHandler(module);
									activeChapterHandler(chapter);
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
									<Grid item>
										<Button
											id={`chapter-menu-button-${chapter.id}`}
											aria-controls={
												menuState[chapter.id]?.open
													? `chapter-menu-${chapter.id}`
													: undefined
											}
											aria-haspopup='true'
											aria-expanded={
												menuState[chapter.id]?.open
													? 'true'
													: undefined
											}
											onClick={e =>
												handleMenuOpen(e, chapter.id)
											}
											variant='text'
											size='small'
											sx={{
												color: 'inherit',
												minWidth: '0px',
											}}
										>
											<MoreVertOutlinedIcon />
										</Button>
										<Menu
											id={`chapter-menu-${chapter.id}`}
											anchorEl={
												menuState[chapter.id]?.target
											}
											open={
												menuState[chapter.id]?.open ||
												false
											}
											onClose={() =>
												handleMenuClose(chapter.id)
											}
											MenuListProps={{
												'aria-labelledby': `course-menu-button-${chapter.id}`,
											}}
										>
											{/* <MenuItem
												onClick={() => {
													navigate(
														`/dashboard/products/courses/edit-course/${chapter.id}`
													);
												}}
											>
												<ModeEditOutlineOutlinedIcon />
												<Typography
													variant='p'
													sx={{
														marginLeft: '10px',
													}}
												>
													Edit
												</Typography>
											</MenuItem> */}
											<MenuItem
												onClick={() =>
													handleDeleteChapter(
														module.id,
														chapter.id
													)
												}
											>
												<DeleteOutlineOutlinedIcon />
												<Typography
													variant='p'
													sx={{
														marginLeft: '10px',
													}}
												>
													Delete
												</Typography>
											</MenuItem>
											<MenuItem
												onClick={() =>
													handleCloneChapter(
														module.id,
														chapter.id
													)
												}
											>
												<FileCopyOutlinedIcon />
												<Typography
													variant='p'
													sx={{
														marginLeft: '10px',
													}}
												>
													Clone
												</Typography>
											</MenuItem>
										</Menu>
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
									addChapterInputState[module.id]?.input || ''
								}
								onChange={e =>
									handleAddChapterInputChange(module.id, e)
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
	);
};

export default ModuleConfigurator;

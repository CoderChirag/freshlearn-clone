import React, { Fragment, useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Paper, Typography, Button, TextField, Box } from '@mui/material';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { useModuleControls } from './useModuleControls.hook';
import { useChapterControls } from './useChapterControls.hook';
import { CoursesContext } from '../../../contexts/courses/courses.context';

const ModuleConfigurator = ({
	activeChapter,
	activeChapterHandler,
	activeModuleHandler,
}) => {
	// All courses data
	const { courses, addNewChapter, addNewModule } = useContext(CoursesContext);
	// Current Course Id
	const { courseId } = useParams();

	// Current Course State
	const [course, setCourse] = useState(null);
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

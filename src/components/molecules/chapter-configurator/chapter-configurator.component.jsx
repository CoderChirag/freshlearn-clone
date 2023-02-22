import React, { Fragment, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { Grid, Paper, Typography, Box, Button, TextField } from '@mui/material';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import PlagiarismOutlinedIcon from '@mui/icons-material/PlagiarismOutlined';
import VolumeMuteOutlinedIcon from '@mui/icons-material/VolumeMuteOutlined';
import WifiTetheringOutlinedIcon from '@mui/icons-material/WifiTetheringOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';

const ChapterConfigurator = ({ chapter, chapterEditHandler }) => {
	// State for the mode (For now only video mode would be available, all other would just show thier names on the UI)
	const [mode, setMode] = useState('video');

	// URL Input field state
	const [addUrlnputState, setAddUrlnputState] = useState({
		visible: false,
		input: '',
	});

	// Handling URL Input field state
	const toggleAddUrlInputVisibility = () => {
		setAddUrlnputState(prev => ({
			visible: !prev.visible,
			input: prev.visible ? '' : prev.input,
		}));
	};
	const handleAddUrlInputChange = e => {
		setAddUrlnputState(prev => ({ visible: true, input: e.target.value }));
	};

	// Submit Handler
	const handleVideoUrlAdd = () => {
		chapterEditHandler({ ...chapter, videoUrl: addUrlnputState.input });
		toggleAddUrlInputVisibility();
	};

	return (
		<Grid
			item
			xs={8.2}
			sx={{
				height: '100%',
				overflowX: 'hidden',
				overflowY: 'auto',
			}}
		>
			{chapter && (
				<Fragment>
					<Paper sx={{ padding: '10px 20px' }}>
						<Typography variant='h6'>{chapter?.title}</Typography>
					</Paper>
					<Grid container>
						<Paper
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
								marginTop: '10px',
								marginRight: '10px',
								padding: '10px 20px',
								cursor: 'pointer',
								backgroundColor:
									mode === 'video' ? '#2c7bf7' : 'white',
								color: mode === 'video' ? 'white' : 'unset',
							}}
							onClick={() => setMode('video')}
						>
							<VideoCallOutlinedIcon />
							<Typography variant='p' sx={{ fontSize: '0.8rem' }}>
								Video
							</Typography>
						</Paper>
						<Paper
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
								marginTop: '10px',
								marginRight: '10px',
								padding: '10px 20px',
								cursor: 'pointer',
								backgroundColor:
									mode === 'document' ? '#2c7bf7' : 'white',
								color: mode === 'document' ? 'white' : 'unset',
							}}
							onClick={() => setMode('document')}
						>
							<PlagiarismOutlinedIcon />
							<Typography variant='p' sx={{ fontSize: '0.8rem' }}>
								Document
							</Typography>
						</Paper>
						<Paper
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
								marginTop: '10px',
								marginRight: '10px',
								padding: '10px 20px',
								cursor: 'pointer',
								backgroundColor:
									mode === 'audio' ? '#2c7bf7' : 'white',
								color: mode === 'audio' ? 'white' : 'unset',
							}}
							onClick={() => setMode('audio')}
						>
							<VolumeMuteOutlinedIcon />
							<Typography variant='p' sx={{ fontSize: '0.8rem' }}>
								Audio
							</Typography>
						</Paper>
						<Paper
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
								marginTop: '10px',
								marginRight: '10px',
								padding: '10px 20px',
								cursor: 'pointer',
								backgroundColor:
									mode === 'live' ? '#2c7bf7' : 'white',
								color: mode === 'live' ? 'white' : 'unset',
							}}
							onClick={() => setMode('live')}
						>
							<WifiTetheringOutlinedIcon />
							<Typography variant='p' sx={{ fontSize: '0.8rem' }}>
								Live
							</Typography>
						</Paper>
						<Paper
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
								marginTop: '10px',
								marginRight: '10px',
								padding: '10px 20px',
								cursor: 'pointer',
								backgroundColor:
									mode === 'quiz' ? '#2c7bf7' : 'white',
								color: mode === 'quiz' ? 'white' : 'unset',
							}}
							onClick={() => setMode('quiz')}
						>
							<QuizOutlinedIcon />
							<Typography variant='p' sx={{ fontSize: '0.8rem' }}>
								Quiz
							</Typography>
						</Paper>
						<Paper
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
								marginTop: '10px',
								marginRight: '10px',
								padding: '10px 20px',
								cursor: 'pointer',
								backgroundColor:
									mode === 'assignment' ? '#2c7bf7' : 'white',
								color:
									mode === 'assignment' ? 'white' : 'unset',
							}}
							onClick={() => setMode('assignment')}
						>
							<AssignmentOutlinedIcon />
							<Typography variant='p' sx={{ fontSize: '0.8rem' }}>
								Assignment
							</Typography>
						</Paper>
					</Grid>
					{mode === 'video' && !chapter?.videoUrl && (
						<Fragment>
							<Grid
								container
								justifyContent='center'
								sx={{ marginTop: '40px' }}
							>
								<Box
									sx={{
										width: '35%',
										padding: '20px 20px',
										display: 'flex',
										justifyContent: 'center',
										backgroundColor: '#fff',
										cursor: 'pointer',
									}}
									onClick={toggleAddUrlInputVisibility}
								>
									<img
										src='https://cdn.freshlms.info/icons/svg__images/youtube_icon.svg'
										alt='youtube_logo'
										style={{ marginRight: '15px' }}
									/>
									<Grid container flexDirection='column'>
										<Typography variant='p'>
											Youtube
										</Typography>
										<Typography variant='caption'>
											You can add the Youtube url
										</Typography>
									</Grid>
								</Box>
							</Grid>
							{addUrlnputState?.visible && (
								<Grid container sx={{ marginTop: '30px' }}>
									<TextField
										id={`add-youtube-video`}
										label='Add Video Url'
										variant='outlined'
										size='small'
										sx={{
											// marginTop: '30px',
											backgroundColor: '#fff',
											width: '80%',
										}}
										value={addUrlnputState?.input || ''}
										onChange={handleAddUrlInputChange}
									/>
									<Button
										variant='contained'
										sx={{
											marginLeft: '30px',
											width: '40px',
											minWidth: 'unset',
										}}
										disabled={!addUrlnputState?.input}
										onClick={handleVideoUrlAdd}
									>
										<DoneOutlinedIcon />
									</Button>
								</Grid>
							)}
						</Fragment>
					)}
					{mode === 'video' && chapter?.videoUrl && (
						<Grid
							container
							sx={{
								width: '100%',
								marginTop: '30px',
								paddingRight: '20px',
							}}
						>
							<ReactPlayer
								url={chapter?.videoUrl}
								controls={true}
								width='100%'
								height='480px'
							/>
						</Grid>
					)}
				</Fragment>
			)}
		</Grid>
	);
};

export default ChapterConfigurator;

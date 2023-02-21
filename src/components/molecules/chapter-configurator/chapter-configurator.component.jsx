import React, { Fragment, useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import PlagiarismOutlinedIcon from '@mui/icons-material/PlagiarismOutlined';
import VolumeMuteOutlinedIcon from '@mui/icons-material/VolumeMuteOutlined';
import WifiTetheringOutlinedIcon from '@mui/icons-material/WifiTetheringOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

const ChapterConfigurator = ({ chapter }) => {
	const [mode, setMode] = useState('video');

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
				</Fragment>
			)}
		</Grid>
	);
};

export default ChapterConfigurator;

import React from 'react';
import { Grid, Typography } from '@mui/material';

const CourseIdBar = ({ title, id }) => {
	return (
		<Grid container>
			<Grid item>
				<Typography variant='h6'>{title}</Typography>
				<Typography variant='caption'>Id : {id}</Typography>
			</Grid>
		</Grid>
	);
};

export default CourseIdBar;

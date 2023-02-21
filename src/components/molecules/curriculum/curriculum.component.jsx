import React, { useState, useContext } from 'react';
import { Grid, Paper } from '@mui/material';

const Curriculum = () => {
	return (
		<Grid
			container
			justifyContent='space-between'
			sx={{ height: '100%', paddingTop: '10px' }}
		>
			<Grid
				item
				xs={3.8}
				sx={{
					height: '100%',
					overflowX: 'hidden',
					overflowY: 'auto',
					boxShadow:
						'0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
				}}
			>
				<Paper sx={{ minHeight: '100%' }}></Paper>
			</Grid>
			<Grid
				item
				xs={8}
				sx={{
					height: '100%',
					overflowX: 'hidden',
					overflowY: 'auto',
					boxShadow:
						'0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
				}}
			>
				<Paper sx={{ minHeight: '100%' }}></Paper>
			</Grid>
		</Grid>
	);
};

export default Curriculum;

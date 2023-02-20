import React from 'react';
import { Grid, Typography } from '@mui/material';

const SidebarSubItem = ({ active, title }) => {
	return (
		<Grid
			container
			alignItems='center'
			sx={{
				marginTop: '2px',
				padding: '5px 35px',
				backgroundColor: active ? '#eff5fe' : 'inherit',
				'&:hover': {
					backgroundColor: '#eff5fe',
				},
			}}
		>
			<Typography
				sx={{
					fontSize: '0.9rem',
					color: '#828282',
				}}
			>
				{title}
			</Typography>
		</Grid>
	);
};

export default SidebarSubItem;

import React from 'react';
import { Grid, Typography } from '@mui/material';

const SidebarItem = ({ active, clickHandler, Icon, fontSize, title }) => {
	return (
		<Grid
			item
			sx={{ marginTop: '5px', cursor: 'pointer' }}
			onClick={clickHandler}
		>
			<Grid
				container
				alignItems='center'
				sx={{
					padding: '5px 10px',
					backgroundColor: active ? '#eff5fe' : 'inherit',
					borderRight: active ? '4px solid #2c7bf7' : 'inherit',
					'&:hover': {
						backgroundColor: '#eff5fe',
						borderRight: '4px solid #2c7bf7',
					},
				}}
			>
				{Icon}
				<Typography sx={{ fontSize: fontSize ? fontSize : 'inherit' }}>
					{title}
				</Typography>
			</Grid>
		</Grid>
	);
};

export default SidebarItem;

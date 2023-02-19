import React from 'react';
import { Box, Grid } from '@mui/material';

const Login = () => {
	return (
		<Box sx={{ flexGrow: 1, width: '100vw', height: '100vh' }}>
			<Grid container sx={{ height: '100%' }}>
				<Grid item xs={8} sx={{ height: '100%' }}>
					<Box
						sx={{
							height: '100%',
							backgroundImage:
								'url(https://cdn.freshlms.info/freshlearn/Login_02.jpg)',
							backgroundPosition: 'bottom',
							backgroundRepeat: 'no-repeat',
							backgroundSize: 'cover',
						}}
					/>
				</Grid>
				<Grid item xs={4} sx={{ height: '100%' }}>
					<Box sx={{ backgroundColor: '#0a2b5e', height: '100%' }} />
				</Grid>
			</Grid>
		</Box>
	);
};

export default Login;

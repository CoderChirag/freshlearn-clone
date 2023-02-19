import React from 'react';
import { Box, Grid } from '@mui/material';

import GoogleButton from '../atoms/google-button/google-button.component';

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
					<Box sx={{ backgroundColor: '#0a2b5e', height: '100%' }}>
						<Grid
							container
							justifyContent='center'
							alignItems='center'
							sx={{ height: '100%' }}
						>
							<Grid item>
								<GoogleButton
									scale={{ lg: 1.5, md: 1.2, sm: 1.1, xs: 1 }}
								/>
								{/* <GoogleButtonDark
								scale={{ xs: 0.8, sm: 1, lg: 1.2 }}
							/> */}
							</Grid>
						</Grid>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Login;

import React, { useState, useContext } from 'react';
import { Grid, Menu, MenuItem, Avatar } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';

import { UserContext } from '../../../contexts/user/user.context';
import { signOutUser } from '../../../util/firebase/auth/firebase-auth.util';

const Navbar = ({ sidebarCollapsed, sidebarCollapseHandler }) => {
	const { currentUser } = useContext(UserContext);
	// Logout Menu State
	const [logoutMenuOpen, setLogoutMenuOpen] = useState(null);
	const logoutMenuState = Boolean(logoutMenuOpen);

	// Logout Menu Handler
	const handleLogoutMenuClick = event => {
		setLogoutMenuOpen(event.currentTarget);
	};
	const handleLogoutMenuClose = () => {
		setLogoutMenuOpen(null);
	};

	// Signout Handler
	const handleSignOut = () => {
		signOutUser();
	};

	return (
		<Grid
			container
			alignItems={'center'}
			sx={{
				height: '62px',
				boxShadow: '0 .125rem .25rem rgba(0,0,0,.075)',
				backgroundColor: '#fff',
				position: 'relative',
				zIndex: 10,
			}}
		>
			<Grid
				item
				xs={sidebarCollapsed ? 0.8 : 2}
				sx={{
					padding: '0 10px',
					maxHeight: '100%',
					// overflow: 'hidden',
				}}
			>
				{sidebarCollapsed ? (
					<img
						src='https://cdn.freshlms.info/freshlearn/f-logo.svg'
						alt='logo'
						style={{
							position: 'relative',
							maxWidth: '100%',
							transform: 'scale(2)',
							zIndex: '0',
						}}
					/>
				) : (
					<img
						src='https://cdn.freshlms.info/freshlearn/FreshLearnLogo_136X30.svg'
						alt='logo'
					/>
				)}
			</Grid>
			<MenuIcon
				sx={{
					cursor: 'pointer',
					position: 'relative',
					zIndex: '10',
				}}
				onClick={sidebarCollapseHandler}
			/>
			<Grid
				item
				xs={6}
				sx={{ padding: '0 10px', position: 'fixed', right: '0' }}
			>
				<Grid
					id='nav-logout-section'
					container
					alignItems='center'
					sx={{ cursor: 'pointer' }}
					aria-controls={logoutMenuState ? 'logout-menu' : undefined}
					aria-haspopup='true'
					aria-expanded={logoutMenuState ? 'true' : undefined}
					onClick={handleLogoutMenuClick}
				>
					<Grid item>
						<Avatar alt='user' src={currentUser?.photoURL} />
					</Grid>
					<Grid item>
						<ArrowDropDownIcon />
					</Grid>
				</Grid>
				<Menu
					id='logout-menu'
					anchorEl={logoutMenuOpen}
					open={logoutMenuState}
					onClose={handleLogoutMenuClose}
					MenuListProps={{
						'aria-labelledby': 'nav-logout-section',
					}}
				>
					<MenuItem onClick={handleLogoutMenuClose}>
						Admin Settings
					</MenuItem>
					<MenuItem onClick={handleLogoutMenuClose}>
						Change Password
					</MenuItem>
					<MenuItem onClick={handleSignOut}>Signout</MenuItem>
				</Menu>
			</Grid>
		</Grid>
	);
};

export default Navbar;

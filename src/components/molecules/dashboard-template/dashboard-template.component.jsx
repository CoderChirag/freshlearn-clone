import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../../contexts/user/user.context';
import { Box, Grid, Menu, MenuItem, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import LanguageIcon from '@mui/icons-material/Language';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import StarIcon from '@mui/icons-material/Star';
import SettingsIcon from '@mui/icons-material/Settings';
import PieChartIcon from '@mui/icons-material/PieChart';
import AppsIcon from '@mui/icons-material/Apps';

import { signOutUser } from '../../../util/firebase/auth/firebase-auth.util';

const DashboardTemplate = ({ children }) => {
	const { currentUser } = useContext(UserContext);
	// Logout Menu State
	const [logoutMenuOpen, setLogoutMenuOpen] = useState(null);
	const logoutMenuState = Boolean(logoutMenuOpen);
	// Sidebar Products Accordion State
	const [productsAccordionOpen, setProductsAccordionOpen] = useState(false);

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

	// Products Accordion State Handler
	const handleProductsAccordion = () => {
		setProductsAccordionOpen(prev => !prev);
	};

	return (
		// Outer Box
		<Box
			sx={{
				flexGrow: 1,
				width: '100vw',
				height: '100vh',
				backgroundColor: '#f2f2f2',
			}}
		>
			{/* Navbar */}
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
				<Grid item xs={2} sx={{ padding: '0 10px' }}>
					<img
						src='https://cdn.freshlms.info/freshlearn/FreshLearnLogo_136X30.svg'
						alt='logo'
					/>
				</Grid>
				<MenuIcon sx={{ cursor: 'pointer' }} />
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
						aria-controls={
							logoutMenuState ? 'logout-menu' : undefined
						}
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
			{/* Box Below Navbar => SideBar + Main */}
			<Grid container sx={{ height: 'calc(100% - 62px)' }}>
				{/* SideBar */}
				<Grid
					item
					xs={2}
					sx={{
						height: '100%',
						boxShadow: '0 .125rem 1rem rgba(0,0,0,.075)',
						backgroundColor: '#fff',
						position: 'relative',
						zIndex: 5,
						overflowY: 'auto',
						overflowX: 'hidden',
					}}
				>
					<Grid container flexDirection='column'>
						{/* SideBar Top */}
						<Grid item sx={{ marginTop: '5px', cursor: 'pointer' }}>
							<Grid
								container
								alignItems='center'
								sx={{
									padding: '5px 10px',
									backgroundColor: '#eff5fe',
									borderRight: '4px solid #2c7bf7',
								}}
							>
								<DashboardIcon
									sx={{
										transform: 'scale(0.8)',
										color: '#7590FF',
									}}
								/>
								<Typography>Dashboard</Typography>
							</Grid>
						</Grid>
						<Grid item sx={{ marginTop: '5px', cursor: 'pointer' }}>
							<Grid
								container
								alignItems='center'
								sx={{
									padding: '5px 10px',
									'&:hover': {
										backgroundColor: '#eff5fe',
										borderRight: '4px solid #2c7bf7',
									},
								}}
							>
								<GroupIcon
									sx={{
										transform: 'scale(0.8)',
										color: '#07D5D8',
									}}
								/>
								<Typography>Members</Typography>
							</Grid>
						</Grid>
						<Grid item sx={{ marginTop: '5px', cursor: 'pointer' }}>
							<Grid
								container
								alignItems='center'
								sx={{
									padding: '5px 10px',
									'&:hover': {
										backgroundColor: '#eff5fe',
										borderRight: '4px solid #2c7bf7',
									},
								}}
							>
								<LanguageIcon
									sx={{
										transform: 'scale(0.8)',
										color: '#06B198',
									}}
								/>
								<Typography>Website</Typography>
							</Grid>
						</Grid>
						<Grid
							item
							sx={{ marginTop: '5px', cursor: 'pointer' }}
							onClick={handleProductsAccordion}
						>
							<Grid
								container
								alignItems='center'
								sx={{
									padding: '5px 10px',
									'&:hover': {
										backgroundColor: '#eff5fe',
										borderRight: '4px solid #2c7bf7',
									},
								}}
							>
								<MenuBookIcon
									sx={{
										transform: 'scale(0.8)',
										color: '#FF7607',
									}}
								/>
								<Typography>Products</Typography>
							</Grid>
						</Grid>
						<Grid
							container
							flexDirection='column'
							sx={{
								overflow: 'hidden',
								visibility: productsAccordionOpen
									? 'visible'
									: 'hidden',
								height: productsAccordionOpen ? 'auto' : 0,
								transition: 'all 1s ease',
							}}
						>
							<Grid item sx={{ cursor: 'pointer' }}>
								<Grid
									container
									alignItems='center'
									sx={{
										padding: '5px 35px',
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
										Courses
									</Typography>
								</Grid>
								<Grid
									container
									alignItems='center'
									sx={{
										padding: '5px 35px',
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
										Masterclass
									</Typography>
								</Grid>
								<Grid
									container
									alignItems='center'
									sx={{
										padding: '5px 35px',
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
										Digital Download
									</Typography>
								</Grid>
								<Grid
									container
									alignItems='center'
									sx={{
										padding: '5px 35px',
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
										Assesments
									</Typography>
								</Grid>
								<Grid
									container
									alignItems='center'
									sx={{
										padding: '5px 35px',
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
										Product Bundle
									</Typography>
								</Grid>
								<Grid
									container
									alignItems='center'
									sx={{
										padding: '5px 35px',
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
										Community
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid item sx={{ marginTop: '5px', cursor: 'pointer' }}>
							<Grid
								container
								alignItems='center'
								sx={{
									padding: '5px 10px',
									'&:hover': {
										backgroundColor: '#eff5fe',
										borderRight: '4px solid #2c7bf7',
									},
								}}
							>
								<FullscreenExitIcon
									sx={{
										transform: 'scale(0.8)',
										color: '#91C174',
									}}
								/>
								<Typography>Marketing</Typography>
							</Grid>
						</Grid>
						<Grid item sx={{ marginTop: '5px', cursor: 'pointer' }}>
							<Grid
								container
								alignItems='center'
								sx={{
									padding: '5px 10px',
									'&:hover': {
										backgroundColor: '#eff5fe',
										borderRight: '4px solid #2c7bf7',
									},
								}}
							>
								<SignalCellularAltIcon
									sx={{
										transform: 'scale(0.8)',
										color: '#3FB0AA',
									}}
								/>
								<Typography>Sales</Typography>
							</Grid>
						</Grid>
						<Grid item sx={{ marginTop: '5px', cursor: 'pointer' }}>
							<Grid
								container
								alignItems='center'
								sx={{
									padding: '5px 10px',
									'&:hover': {
										backgroundColor: '#eff5fe',
										borderRight: '4px solid #2c7bf7',
									},
								}}
							>
								<StarIcon
									sx={{
										transform: 'scale(0.8)',
										color: '#F67E8A',
									}}
								/>
								<Typography>Testimonials</Typography>
							</Grid>
						</Grid>
						<Grid item sx={{ marginTop: '5px', cursor: 'pointer' }}>
							<Grid
								container
								alignItems='center'
								sx={{
									padding: '5px 10px',
									'&:hover': {
										backgroundColor: '#eff5fe',
										borderRight: '4px solid #2c7bf7',
									},
								}}
							>
								<SettingsIcon
									sx={{
										transform: 'scale(0.8)',
										color: '#B245FF',
									}}
								/>
								<Typography>Settings</Typography>
							</Grid>
						</Grid>
						<Grid item sx={{ marginTop: '5px', cursor: 'pointer' }}>
							<Grid
								container
								alignItems='center'
								sx={{
									padding: '5px 10px',
									'&:hover': {
										backgroundColor: '#eff5fe',
										borderRight: '4px solid #2c7bf7',
									},
								}}
							>
								<PieChartIcon
									sx={{
										transform: 'scale(0.8)',
										color: '#ABE5FF',
									}}
								/>
								<Typography>Reports</Typography>
							</Grid>
						</Grid>
						<Grid item sx={{ marginTop: '5px', cursor: 'pointer' }}>
							<Grid
								container
								alignItems='center'
								sx={{
									padding: '5px 10px',
									'&:hover': {
										backgroundColor: '#eff5fe',
										borderRight: '4px solid #2c7bf7',
									},
								}}
							>
								<AppsIcon
									sx={{
										transform: 'scale(0.8)',
										color: '#FCB774',
									}}
								/>
								<Typography sx={{ fontSize: '0.9rem' }}>
									Apps&Integrations
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
};

export default DashboardTemplate;

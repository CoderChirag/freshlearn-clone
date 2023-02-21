import React, { useContext, useState, Fragment } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { UserContext } from '../../../contexts/user/user.context';
import { Box, Grid, Menu, MenuItem } from '@mui/material';
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

import SidebarItem from '../../atoms/sidebar-item/sidebar-item.component';
import SidebarSubItem from '../../atoms/sidebar-subitem/sidebar-subitem.component';
import Navbar from '../../atoms/navbar/navbar.component';

const DashboardTemplate = ({ children }) => {
	const location = useLocation();

	// Sidebar Collapsed State
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
	// Sidebar Products Accordion State
	const [productsAccordionOpen, setProductsAccordionOpen] = useState(false);

	// Sidebar Collapsed Handler
	const handleSidebarCollapse = () => {
		setSidebarCollapsed(prev => !prev);
	};
	// Products Accordion State Handler
	const handleProductsAccordion = () => {
		setProductsAccordionOpen(prev => !prev);
	};

	// Sidebar Items
	const sidebarItems = [
		{
			key: 1,
			title: 'Dashboard',
			icon: (
				<DashboardIcon
					sx={{ transform: 'scale(0.8)', color: '#7590FF' }}
				/>
			),
			location: /\/dashboard\/home\/*$/i,
			link: '/dashboard/home',
		},
		{
			key: 2,
			title: 'Members',
			icon: (
				<GroupIcon sx={{ transform: 'scale(0.8)', color: '#07D5D8' }} />
			),
			location: /\/dashboard\/members\/*$/i,
			link: '/dashboard/members',
		},
		{
			key: 3,
			title: 'Website',
			icon: (
				<LanguageIcon
					sx={{ transform: 'scale(0.8)', color: '#06B198' }}
				/>
			),
			location: /\/dashboard\/website\/*$/i,
			link: '/dashboard/website',
		},
		{
			key: 4,
			title: 'Products',
			icon: (
				<MenuBookIcon
					sx={{ transform: 'scale(0.8)', color: '#FF7607' }}
				/>
			),
			location: /\/dashboard\/products*/i,
			link: '#',
			clickHandler: handleProductsAccordion,
			state: productsAccordionOpen,
			subItems: [
				{
					key: 1,
					title: 'Courses',
					location:
						/\/dashboard\/products\/courses\/courses-list\/*$/i,
					link: '/dashboard/products/courses/courses-list',
				},
				{
					key: 2,
					title: 'Masterclass',
					location: /\/dashboard\/products\/masterclass\/*$/i,
					link: '/dashboard/products/masterclass',
				},
				{
					key: 3,
					title: 'Digital Download',
					location: /\/dashboard\/products\/digital-download\/*$/i,
					link: '/dashboard/products/digital-download',
				},
				{
					key: 4,
					title: 'Assesments',
					location: /\/dashboard\/products\/assesments\/*$/i,
					link: '/dashboard/products/assesments',
				},
				{
					key: 5,
					title: 'Product bundle',
					location: /\/dashboard\/products\/product-bundle\/*$/i,
					link: '/dashboard/products/product-bundle',
				},
				{
					key: 6,
					title: 'Community',
					location: /\/dashboard\/products\/community\/*$/i,
					link: '/dashboard/products/community',
				},
			],
		},
		{
			key: 5,
			title: 'Marketing',
			icon: (
				<FullscreenExitIcon
					sx={{ transform: 'scale(0.8)', color: '#91C174' }}
				/>
			),
			location: /\/dashboard\/marketing\/*$/i,
			link: '/dashboard/marketing',
		},
		{
			key: 6,
			title: 'Sales',
			icon: (
				<SignalCellularAltIcon
					sx={{ transform: 'scale(0.8)', color: '#3FB0AA' }}
				/>
			),
			location: /\/dashboard\/sales\/*$/i,
			link: '/dashboard/sales',
		},
		{
			key: 7,
			title: 'Testimonials',
			icon: (
				<StarIcon sx={{ transform: 'scale(0.8)', color: '#F67E8A' }} />
			),
			location: /\/dashboard\/testimonials\/*$/i,
			link: '/dashboard/testimonials',
		},
		{
			key: 8,
			title: 'Settings',
			icon: (
				<SettingsIcon
					sx={{ transform: 'scale(0.8)', color: '#B245FF' }}
				/>
			),
			location: /\/dashboard\/settings\/*$/i,
			link: '/dashboard/settings',
		},
		{
			key: 9,
			title: 'Reports',
			icon: (
				<PieChartIcon
					sx={{ transform: 'scale(0.8)', color: '#ABE5FF' }}
				/>
			),
			location: /\/dashboard\/reports\/*$/i,
			link: '/dashboard/reports',
		},
		{
			key: 10,
			title: 'Apps&Integrations',
			icon: (
				<AppsIcon sx={{ transform: 'scale(0.8)', color: '#FCB774' }} />
			),
			location: /\/dashboard\/apps&intergrations\/*$/i,
			link: '/dashboard/apps&integrations',
			fontSize: '0.9rem',
		},
	];

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
			<Navbar
				sidebarCollapsed={sidebarCollapsed}
				sidebarCollapseHandler={handleSidebarCollapse}
			/>
			{/* Box Below Navbar => SideBar + Main */}
			<Grid container sx={{ height: 'calc(100% - 62px)' }}>
				{/* SideBar */}
				<Grid
					item
					xs={!sidebarCollapsed ? 2 : 0.4}
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
						{/* SideBar Items*/}
						{sidebarItems.map(item => (
							<Fragment key={item.key}>
								<Link
									to={item.link}
									style={{
										color: 'unset',
										textDecoration: 'none',
									}}
								>
									<SidebarItem
										active={
											location.pathname.match(
												item.location
											)
												? true
												: false
										}
										collapsed={sidebarCollapsed}
										clickHandler={item?.clickHandler}
										Icon={item.icon}
										fontSize={item?.fontSize}
										title={item.title}
									/>
								</Link>
								{!sidebarCollapsed &&
									item.subItems &&
									item.subItems.map(subItem => (
										<Link
											key={subItem.key}
											to={subItem.link}
											style={{
												color: 'unset',
												textDecoration: 'none',
											}}
										>
											<Grid
												container
												flexDirection='column'
												sx={{
													overflow: 'hidden',
													visibility: item.state
														? 'visible'
														: 'hidden',
													height: item.state
														? 'auto'
														: 0,
													transition: 'all 1s ease',
												}}
											>
												<Grid
													item
													sx={{ cursor: 'pointer' }}
												>
													<SidebarSubItem
														active={location.pathname.match(
															subItem.location
														)}
														title={subItem.title}
													/>
												</Grid>
											</Grid>
										</Link>
									))}
							</Fragment>
						))}
					</Grid>
				</Grid>
				{/* Main */}
				<Grid
					item
					xs={10}
					sx={{
						height: '100%',
						overflowY: 'auto',
						overflowX: 'hidden',
						paddingLeft: '30px',
						paddingTop: '15px',
					}}
				>
					{children}
				</Grid>
			</Grid>
		</Box>
	);
};

export default DashboardTemplate;

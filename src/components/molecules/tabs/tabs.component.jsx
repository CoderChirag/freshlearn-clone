import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Tabs, Tab, Box, Paper } from '@mui/material';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <>{children}</>}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `tab-${index}`,
		'aria-controls': `tabpanel-${index}`,
	};
}

export default function TabsComponent({ tabs, active }) {
	const navigate = useNavigate();

	const [value, setValue] = React.useState(active);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		// <div style={{ width: '100%', height: '82%' }}>
		<Box sx={{ width: '100%', height: '82%' }}>
			<Paper
				// elevation={8}
				sx={{ borderBottom: 1, borderColor: 'divider' }}
			>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label='tabs'
					sx={{
						'& .MuiTabs-flexContainer': {
							justifyContent: 'space-evenly',
						},
					}}
				>
					{tabs.map(tab => (
						<Tab
							key={tab.key}
							label={`${tab.key + 1}. ${tab.title}`}
							{...a11yProps(tab.key)}
							onClick={() => navigate(tab.link)}
						/>
					))}
				</Tabs>
			</Paper>
			{tabs.map(tab => (
				<TabPanel
					key={tab.key}
					value={value}
					index={tab.key}
					style={{ height: '100%' }}
				>
					{tab.component}
				</TabPanel>
			))}
		</Box>
		// </div>
	);
}

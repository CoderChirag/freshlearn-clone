import React from 'react';
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
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
							label={`${tab.key}. ${tab.title}`}
							{...a11yProps(tab.key)}
						/>
					))}
				</Tabs>
			</Paper>
			<TabPanel value={value} index={0}>
				Item One
			</TabPanel>
			<TabPanel value={value} index={1}>
				Item Two
			</TabPanel>
			<TabPanel value={value} index={2}>
				Item Three
			</TabPanel>
		</Box>
	);
}

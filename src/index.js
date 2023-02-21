import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import { UserProvider } from './contexts/user/user.context';
import { CoursesProvider } from './contexts/courses/courses.context';

import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<CssBaseline />
			<UserProvider>
				<CoursesProvider>
					<App />
				</CoursesProvider>
			</UserProvider>
		</BrowserRouter>
	</React.StrictMode>
);

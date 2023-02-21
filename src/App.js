import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Root from './components/organisms/root.component';
import AuthRoutes from './routes/auth/auth.routes';
import DashboardRoutes from './routes/dashboard/dashboard.routes';
import CoursesList from './components/molecules/courses-list/courses-list.component';

import { CoursesProvider } from './contexts/courses/courses.context';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Root />} />
			<Route path='/login' element={<AuthRoutes />} />
			<Route path='dashboard' element={<DashboardRoutes />}>
				{/* <Route index element={<DashboardRoutes />} /> */}
				<Route path='home' element={<div>Home</div>} />
				<Route path='members' element={<div>Course</div>} />
				<Route path='website' element={<div>Website</div>} />
				<Route path='products'>
					<Route index element={<div>Products</div>} />
					<Route
						path='courses/courses-list'
						element={<CoursesList />}
					/>
					<Route path='*' element={<div>Inside Products</div>} />
				</Route>
				<Route path='marketing' element={<div>Marketing</div>} />
				<Route path='sales' element={<div>Sales</div>} />
				<Route path='testimonials' element={<div>Testimonials</div>} />
				<Route path='settings' element={<div>Settings</div>} />
				<Route path='reports' element={<div>Reports</div>} />
				<Route
					path='apps&integrations'
					element={<div>App & Integrations</div>}
				/>
			</Route>
			<Route path='*' element={<div>404</div>} />
		</Routes>
	);
}

export default App;

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Root from './components/organisms/root.component';
import AuthRoutes from './routes/auth/auth.routes';
import DashboardRoutes from './routes/dashboard/dashboard.routes';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Root />} />
			<Route path='/login' element={<AuthRoutes />} />
			<Route path='dashboard' element={<DashboardRoutes />}>
				{/* <Route index element={<DashboardRoutes />} /> */}
				<Route path='home' element={<div>Home</div>} />
				<Route path='course' element={<div>Course</div>} />
			</Route>
			<Route path='*' element={<div>404</div>} />
		</Routes>
	);
}

export default App;

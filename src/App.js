import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Root from './components/organisms/root.component';
import AuthRoutes from './routes/auth/auth.routes';
import DashboardRoutes from './routes/dashboard/dashboard.routes';
import CoursesList from './components/molecules/courses-list/courses-list.component';
import AddCourse from './components/molecules/add-course/add-course.component';
import EditCourse from './components/molecules/edit-course/edit-course.component';
import CoursePage from './components/organisms/course-page/course-page.component';

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
					<Route path='courses/add-course' element={<AddCourse />} />
					<Route
						path='courses/edit-course/:courseId'
						element={<EditCourse />}
					/>
					<Route path='courses/:courseId'>
						<Route index element={<Navigate to='curriculum' />} />
						<Route path='curriculum' element={<CoursePage />} />
						<Route path='pricing' element={<CoursePage />} />
						<Route path='pages' element={<CoursePage />} />
						<Route path='drip' element={<CoursePage />} />
						<Route path='certificate' element={<CoursePage />} />
						<Route path='gamification' element={<CoursePage />} />
					</Route>
					<Route
						path='masterclass'
						element={<div>Masterclass</div>}
					/>
					<Route
						path='digital-download'
						element={<div>Digital Download</div>}
					/>
					<Route path='assesments' element={<div>Assesments</div>} />
					<Route
						path='product-bundle'
						element={<div>Product Bundle</div>}
					/>
					<Route path='community' element={<div>Community</div>} />
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

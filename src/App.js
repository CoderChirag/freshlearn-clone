import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Root from './components/organisms/root.component';
import Login from './components/organisms/login.component';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Root />} />
			<Route path='/login' element={<Login />} />
			<Route path='*' element={<div>404</div>} />
		</Routes>
	);
}

export default App;

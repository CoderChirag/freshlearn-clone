import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { UserContext } from '../../contexts/user/user.context';
import Login from '../../components/organisms/login-page/login.component';

const AuthRoutes = () => {
	const { currentUser } = useContext(UserContext);
	return currentUser || window.localStorage.getItem('user') ? (
		<Navigate to='/dashboard' />
	) : (
		<Login />
	);
};

export default AuthRoutes;

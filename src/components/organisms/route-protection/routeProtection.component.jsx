import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { UserContext } from '../../../contexts/user/user.context';

const RouteProtection = ({ children }) => {
	const { currentUser } = useContext(UserContext);
	return !currentUser && !window.localStorage.getItem('user') ? (
		<Navigate to='/login' />
	) : (
		<>{children}</>
	);
};

export default RouteProtection;

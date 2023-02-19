import { Outlet, useLocation, Navigate } from 'react-router-dom';

import RouteProtection from '../../components/organisms/route-protection/routeProtection.component';

const DashboardRoutes = () => {
	const location = useLocation();
	return location.pathname.match(/\/dashboard\/*$/i) ? (
		<Navigate to='/dashboard/home' />
	) : (
		<RouteProtection>
			{console.log(location)}
			<div>Dashboard</div>
			<Outlet />
		</RouteProtection>
	);
};

export default DashboardRoutes;

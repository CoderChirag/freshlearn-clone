import { Outlet, useLocation, Navigate } from 'react-router-dom';

import RouteProtection from '../../components/organisms/route-protection/routeProtection.component';
import DashboardTemplate from '../../components/molecules/dashboard-template/dashboard-template.component';

const DashboardRoutes = () => {
	const location = useLocation();
	return location.pathname.match(/\/dashboard\/*$/i) ? (
		<Navigate to='/dashboard/home' />
	) : (
		<RouteProtection>
			<DashboardTemplate>
				<Outlet />
			</DashboardTemplate>
		</RouteProtection>
	);
};

export default DashboardRoutes;

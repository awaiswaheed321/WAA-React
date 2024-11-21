import { createBrowserRouter } from 'react-router-dom';
import Login from '../components/Login.jsx';
import NotFound from '../components/NotFound.jsx';
import SignUp from '../components/SignUp.jsx';
import WelcomePage from '../components/WelcomePage.jsx';
import PrivateRoute from './PrivateRouter.jsx';
import Dashboard from '../containers/Dashboard.jsx';
import PendingSellerContainer from '../containers/PendingSellerContainer.jsx';
import DashboardLanding from '../components/DashboardLanding.jsx';
import AdminReviewContainer from '../containers/AdminReviewContainer.jsx';

export const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <WelcomePage />,
    },
    {
        path: '/signUp',
        element: <SignUp />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/dashboard',
        element: (
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        ),
        children: [
            { path: '', element: <DashboardLanding /> },
            { path: 'pending-sellers', element: <PendingSellerContainer /> },
            { path: 'admin-reviews', element: <AdminReviewContainer /> },
            // { path: 'component-c', element: <ComponentC /> },
            // { path: 'component-d', element: <ComponentD /> },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);

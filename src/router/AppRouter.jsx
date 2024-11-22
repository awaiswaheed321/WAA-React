import { createBrowserRouter } from 'react-router-dom';
import Login from '../components/auth/Login.jsx';
import NotFound from '../components/base/NotFound.jsx';
import SignUp from '../components/auth/SignUp.jsx';
import WelcomePage from '../components/dashboard/WelcomePage.jsx';
import PrivateRoute from './PrivateRouter.jsx';
import Dashboard from '../containers/Dashboard.jsx';
import PendingSellerContainer from '../containers/PendingSellerContainer.jsx';
import DashboardLanding from '../components/dashboard/DashboardLanding.jsx';
import AdminReviewContainer from '../containers/AdminReviewContainer.jsx';
import CreateProduct from '../components/seller/CreateProduct.jsx';
import SellerProductContainer from '../containers/SellerProductContainer.jsx';
import SellerProductDetail from '../components/seller/SellerProductDetail.jsx';

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
            { path: 'create-product', element: <CreateProduct /> },
            { path: 'seller-products', element: <SellerProductContainer /> },
            { path: 'seller-products/:id', element: <SellerProductDetail /> },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);

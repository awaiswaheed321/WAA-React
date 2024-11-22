import { createBrowserRouter } from 'react-router-dom';
import Login from '../components/auth/Login.jsx';
import SignUp from '../components/auth/SignUp.jsx';
import NotFound from '../components/base/NotFound.jsx';
import WelcomePage from '../components/dashboard/WelcomePage.jsx';
import CreateProduct from '../components/seller/CreateProduct.jsx';
import SellerProductDetail from '../components/seller/SellerProductDetail.jsx';
import UpdateProduct from '../components/seller/UpdateProduct.jsx';
import UserRole from '../constants/UserRoles.js';
import AdminReviewContainer from '../containers/AdminReviewContainer.jsx';
import Dashboard from '../containers/DashboardContainer.jsx';
import PendingSellerContainer from '../containers/PendingSellerContainer.jsx';
import SellerOrderContainer from '../containers/SellerOrderContainer.jsx';
import SellerProductContainer from '../containers/SellerProductContainer.jsx';
import PrivateRoute from './PrivateRouter.jsx';
import DashboardLanding from '../components/dashboard/DashboardLanding.jsx'

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
            <PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.SELLER]}>
                <Dashboard />
            </PrivateRoute>
        ),
        children: [
            { path: '', element: (
                <PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.SELLER, UserRole.BUYER]}>
                    <DashboardLanding />
                </PrivateRoute>
            ) },
            // Admin Routes
            {
                path: 'admin-reviews',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.ADMIN]}>
                        <AdminReviewContainer />
                    </PrivateRoute>
                ),
            },
            {
                path: 'pending-sellers',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.ADMIN]}>
                        <PendingSellerContainer />
                    </PrivateRoute>
                ),
            },
            // Seller Routes
            {
                path: 'create-product',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.SELLER]}>
                        <CreateProduct />
                    </PrivateRoute>
                ),
            },
            {
                path: 'seller-products',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.SELLER]}>
                        <SellerProductContainer />
                    </PrivateRoute>
                ),
            },
            {
                path: 'seller-products/:id',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.SELLER]}>
                        <SellerProductDetail />
                    </PrivateRoute>
                ),
            },
            {
                path: 'seller-products/update/:id',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.SELLER]}>
                        <UpdateProduct />
                    </PrivateRoute>
                ),
            },
            {
                path: 'seller-orders',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.SELLER]}>
                        <SellerOrderContainer />
                    </PrivateRoute>
                ),
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);

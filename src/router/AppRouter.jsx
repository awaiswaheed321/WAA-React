import { createBrowserRouter } from 'react-router-dom';
import Login from '../components/auth/Login.jsx';
import SignUp from '../components/auth/SignUp.jsx';
import NotFound from '../components/base/NotFound.jsx';
import BuyerOrderDetail from '../components/buyer/BuyerOrderDetail.jsx';
import BuyerProductDetail from '../components/buyer/BuyerProdutcDetail.jsx';
import DashboardLanding from '../components/dashboard/DashboardLanding.jsx';
import WelcomePage from '../components/dashboard/WelcomePage.jsx';
import CreateProduct from '../components/seller/CreateProduct.jsx';
import SellerProductDetail from '../components/seller/SellerProductDetail.jsx';
import UpdateProduct from '../components/seller/UpdateProduct.jsx';
import UserRole from '../constants/UserRoles.js';
import AdminReviewContainer from '../containers/AdminReviewContainer.jsx';
import BuyerOrderContainer from '../containers/BuyerOrderContainer.jsx';
import BuyerProductContainer from '../containers/BuyerProductContainer.jsx';
import CartContainer from '../containers/CartContainer.jsx';
import Dashboard from '../containers/DashboardContainer.jsx';
import PendingSellerContainer from '../containers/PendingSellerContainer.jsx';
import SellerOrderContainer from '../containers/SellerOrderContainer.jsx';
import SellerProductContainer from '../containers/SellerProductContainer.jsx';
import PrivateRoute from './PrivateRouter.jsx';
import AddressContainer from '../containers/AddressContainer.jsx';

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
            <PrivateRoute
                allowedRoles={[UserRole.ADMIN, UserRole.SELLER, UserRole.BUYER]}
            >
                <Dashboard />
            </PrivateRoute>
        ),
        children: [
            {
                path: '',
                element: (
                    <PrivateRoute
                        allowedRoles={[
                            UserRole.ADMIN,
                            UserRole.SELLER,
                            UserRole.BUYER,
                        ]}
                    >
                        <DashboardLanding />
                    </PrivateRoute>
                ),
            },
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
            // Buyer Routes
            {
                path: 'buyer-products',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.BUYER]}>
                        <BuyerProductContainer />
                    </PrivateRoute>
                ),
            },
            {
                path: 'buyer-products/:id',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.BUYER]}>
                        <BuyerProductDetail />
                    </PrivateRoute>
                ),
            },
            {
                path: 'buyer-orders',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.BUYER]}>
                        <BuyerOrderContainer />
                    </PrivateRoute>
                ),
            },
            {
                path: 'buyer-orders/:id',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.BUYER]}>
                        <BuyerOrderDetail />
                    </PrivateRoute>
                ),
            },
            {
                path: 'cart',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.BUYER]}>
                        <CartContainer />
                    </PrivateRoute>
                ),
            },
            {
                path: 'address',
                element: (
                    <PrivateRoute allowedRoles={[UserRole.BUYER]}>
                        <AddressContainer />
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

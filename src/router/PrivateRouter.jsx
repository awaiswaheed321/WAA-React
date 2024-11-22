import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { getAccessToken, getUserCookie } from '../cookies/AuthCookie';

const PrivateRoute = ({ children, allowedRoles }) => {
    const isAuthenticated = !!getAccessToken();
    const userRole = getUserCookie()?.role;

    if (!isAuthenticated) return <Navigate to="/login" />;
    if (!allowedRoles.includes(userRole)) return <Navigate to="/dashboard" />;
    return children;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired, // Ensures that children are passed to the component
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired, // Validates allowedRoles is an array of strings
};

export default PrivateRoute;

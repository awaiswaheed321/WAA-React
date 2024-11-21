import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { getAccessToken } from '../cookies/AuthCookie';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!getAccessToken();

    return isAuthenticated ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoute;

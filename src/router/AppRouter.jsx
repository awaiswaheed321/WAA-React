import { createBrowserRouter } from 'react-router-dom';
import NotFound from '../components/NotFound.jsx';
import WelcomePage from '../components/WelcomePage.jsx';
import Signup from '../components/Signup.jsx';

export const AppRouter = createBrowserRouter([{
    path: '/', element: <WelcomePage />,
}, {
    path: '/signup', element: <Signup />,
}, {
    path: '*', element: <NotFound />,
}]);

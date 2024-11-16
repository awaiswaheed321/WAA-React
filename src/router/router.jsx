import { createBrowserRouter } from 'react-router-dom';
import Students from '../containers/Students.jsx';
import Dashboard from '../containers/Dashboard.jsx';
import AddStudent from '../components/AddStudent.jsx';
import SelectedStudent from '../containers/SelectedStudents.jsx';
import NotFound from '../components/NotFound.jsx';
import SelectedStudents from '../containers/SelectedStudents.jsx';

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <Students />,
    },
    { path: '/dashboard', element: <Dashboard /> },
    {
        path: '/add-student',
        element: <AddStudent />,
    },
    { path: '/selected-student', element: <SelectedStudents /> },
    {
        path: '*',
        element: <NotFound />,
    },
]);

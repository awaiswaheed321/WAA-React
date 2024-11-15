import {createRoot} from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import LandingPage from "./components/LandingPage.jsx";
import PostsContainer from "./containers/PostsContainer.jsx";
import CreatePost from "./components/CreatePost.jsx";
import NotFound from "./components/NotFound.jsx";

const router = createBrowserRouter([
    { path: '/', element: <LandingPage /> },
    { path: '/posts', element: <PostsContainer /> },
    { path: '/create-post', element: <CreatePost /> },
    { path: '*', element: <NotFound /> }
]);

createRoot(document.getElementById('root')).render(<RouterProvider router={router}/>);

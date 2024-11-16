import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { Router } from './router/router.jsx';
import { Provider } from 'react-redux';
import store from './state/store.js';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={Router} />
    </Provider>,
);

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from './view/PageErreur/PageErreur';
import Login from './view/Login/Login';
import Profile from './view/Profile/Profile';
import Register from './view/Register/Register';
import Admin from './view/Admin/Admin';
import AdminBooks from './view/AdminBooks/AdminBooks';
import AdminClients from './view/AdminClients/AdminClients';
import AdminCreateBook from './view/AdminCreateBook/AdminCreateBook';
import AdminCreateClient from './view/AdminCreateClient.jsx/AdminCreateClient';
import AdminEditBook from './view/AdminEditBook/AdminEditBook';
import AdminEditClient from './view/AdminEditClient/AdminEditClient';

const router = createBrowserRouter([
	{
		path: '/',
		element: <div>test</div>,
	},
	{
		path: '/signin',
		element: <Login />,
	},
	{
		path: '/signup',
		element: <Register />,
	},
	{
		path: '/profile',
		element: <Profile />,
	},
	{
		path: '/admin',
		element: <Admin />,
	},
	{
		path: '/admin/books',
		element: <AdminBooks />,
	},
	{
		path: '/admin/clients',
		element: <AdminClients />,
	},
	{
		path: '/admin/books/create',
		element: <AdminCreateBook />,
	},
	{
		path: '/admin/clients/create',
		element: <AdminCreateClient />,
	},
	{
		path: '/admin/books/edit',
		element: <AdminEditBook />,
	},
	{
		path: '/admin/clients/edit',
		element: <AdminEditClient />,
	},
	{
		path: '*',
		element: <ErrorPage />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />
);

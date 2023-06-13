import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import ErrorPage from './view/PageErreur/PageErreur'
import Login from './view/Login/Login';
import Profile from './view/Profile/Profile';
import Register from './view/Register/Register';
import Admin from './view/Admin/Admin';
import AdminBooks from './view/AdminBooks/AdminBooks';
import AdminClients from './view/AdminClients/AdminClients';

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
		path: '/admin-books',
		element: <AdminBooks />,
	},
	{
		path: '/admin-clients',
		element: <AdminClients />,
	},{
		path: '*',
		element: <ErrorPage />,
	  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />
);

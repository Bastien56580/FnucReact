import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import ErrorPage from './view/PageErreur/PageErreur'
import Login from './view/Login/Login';
import Profile from './view/Profile/Profile';
import Register from './view/Register/Register';
import Admin from './view/Admin/Admin';
import AdminBooks from './view/AdminBooks/AdminBooks';
import AdminClients from './view/AdminClients/AdminClients';
import DetailOrder from './view/DetailOrder/DetailOrder'
import Home from './view/Home/Home';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
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
	},
	{
		path: '/detail-order/:id',
		element: <DetailOrder />,
	},
	{
		path: '*',
		element: <ErrorPage />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />
);

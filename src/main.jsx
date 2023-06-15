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
		path: '/FnucReact/',
		element: <Home />,
	},
	{
		path: '/FnucReact/signin',
		element: <Login />,
	},
	{
		path: '/FnucReact/signup',
		element: <Register />,
	},
	{
		path: '/FnucReact/profile',
		element: <Profile />,
	},
	{
		path: '/FnucReact/admin',
		element: <Admin />,
	},
	{
		path: '/FnucReact/admin-books',
		element: <AdminBooks />,
	},
	{
		path: '/FnucReact/admin-clients',
		element: <AdminClients />,
	},
	{
		path: '/FnucReact/detail-order/:id',
		element: <DetailOrder />,
	},
	{
		path: '/FnucReact/*',
		element: <ErrorPage />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />
);

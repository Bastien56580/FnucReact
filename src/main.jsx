import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AdminProtectedRoutes from './components/AdminProtectedRoutes/AdminProtectedRoutes'

const ErrorPage = lazy(() => import('./view/PageErreur/PageErreur'));
const Login = lazy(() => import('./view/Login/Login'));
const Profile = lazy(() => import('./view/Profile/Profile'));
const Register = lazy(() => import('./view/Register/Register'));
const Admin = lazy(() => import('./view/Admin/Admin'));
const AdminBooks = lazy(() => import('./view/AdminBooks/AdminBooks'));
const AdminClients = lazy(() => import('./view/AdminClients/AdminClients'));
const AdminIndexes = lazy(() => import('./view/AdminIndexes/AdminIndexes'));
const AdminCreateBook = lazy(() =>
	import('./view/AdminCreateBook/AdminCreateBook')
);
const AdminCreateClient = lazy(() =>
	import('./view/AdminCreateClient/AdminCreateClient')
);
const AdminCreateKeyword = lazy(() =>
	import('./view/AdminCreateKeyword/AdminCreateKeyword')
);
const AdminCreateTopic = lazy(() =>
	import('./view/AdminCreateTopic/AdminCreateTopic')
);
const AdminEditBook = lazy(() => import('./view/AdminEditBook/AdminEditBook'));
const AdminEditClient = lazy(() =>
	import('./view/AdminEditClient/AdminEditClient')
);
const AdminEditKeyword = lazy(() =>
	import('./view/AdminEditKeyword/AdminEditKeyword')
);
const AdminEditTopic = lazy(() =>
	import('./view/AdminEditTopic/AdminEditTopic')
);
const Home = lazy(() => import('./view/Home/Home'));
const DetailOrder = lazy(() => import('./view/DetailOrder/DetailOrder'));
import Loading from './view/Loading/Loading';
import SearchView from './view/SearchView/SearchView';
import Parameter from './view/Parameter/Parameter';

import { setReactAppBackURL } from './script/env';

setReactAppBackURL();

const LazyRoute = ({ component: Component, ...rest }) => (
	<Suspense fallback={<Loading />}>
		<Component {...rest} />
	</Suspense>
);

const router = createBrowserRouter([
	{
		path: '/',
		element: <LazyRoute component={Home} />,
	},
	{
		path: '/signin',
		element: <LazyRoute component={Login} />,
	},
	{
		path: '/signup',
		element: <LazyRoute component={Register} />,
	},
	{
		path: '/profile',
		element: <ProtectedRoute component={Profile} />,
	},
	{
		path: '/admin',
		element: <AdminProtectedRoutes component={Admin} />,
	},
	{
		path: '/admin/books',
		element: <AdminProtectedRoutes component={AdminBooks} />,
	},
	{
		path: '/admin/clients',
		element: <AdminProtectedRoutes component={AdminClients} />,
	},
	{
		path: '/admin/indexes',
		element: <AdminProtectedRoutes component={AdminIndexes} />,
	},
	{
		path: '/admin/books/create',
		element: <AdminProtectedRoutes component={AdminCreateBook} />,
	},
	{
		path: '/admin/clients/create',
		element: <AdminProtectedRoutes component={AdminCreateClient} />,
	},
	{
		path: '/admin/keywords/create',
		element: <AdminProtectedRoutes component={AdminCreateKeyword} />,
	},
	{
		path: '/admin/topics/create',
		element: <AdminProtectedRoutes component={AdminCreateTopic} />,
	},
	{
		path: '/admin/books/edit/:id',
		element: <AdminProtectedRoutes component={AdminEditBook} />,
	},
	{
		path: '/admin/clients/edit/:id',
		element: <AdminProtectedRoutes component={AdminEditClient} />,
	},
	{
		path: '/admin/topics/edit/:id',
		element: <AdminProtectedRoutes component={AdminEditTopic} />,
	},
	{
		path: '/admin/keywords/edit/:id',
		element: <AdminProtectedRoutes component={AdminEditKeyword} />,
	},
	{
		path: '/admin/parameter/',
		element: <AdminProtectedRoutes component={Parameter} />,
	},
	{
		path: '/detail-order/:id',
		element: <LazyRoute component={DetailOrder} />,
	},
	{
		path: '*',
		element: <LazyRoute component={ErrorPage} />,
	},
	{
		path: '/search',
		element: <LazyRoute component={SearchView} />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />
);

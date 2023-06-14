import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const ErrorPage = lazy(() => import('./view/PageErreur/PageErreur'));
const Login = lazy(() => import('./view/Login/Login'));
const Profile = lazy(() => import('./view/Profile/Profile'));
const Register = lazy(() => import('./view/Register/Register'));
const Admin = lazy(() => import('./view/Admin/Admin'));
const AdminBooks = lazy(() => import('./view/AdminBooks/AdminBooks'));
const AdminClients = lazy(() => import('./view/AdminClients/AdminClients'));
const AdminCreateBook = lazy(() =>
	import('./view/AdminCreateBook/AdminCreateBook')
);
const AdminCreateClient = lazy(() =>
	import('./view/AdminCreateClient/AdminCreateClient')
);
const AdminEditBook = lazy(() => import('./view/AdminEditBook/AdminEditBook'));
const AdminEditClient = lazy(() =>
	import('./view/AdminEditClient/AdminEditClient')
);
const Home = lazy(() => import('./view/Home/Home'));
const DetailOrder = lazy(() => import('./view/DetailOrder/DetailOrder'));
import Loading from './view/Loading/Loading';

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
		element: <LazyRoute component={Profile} />,
	},
	{
		path: '/admin',
		element: <LazyRoute component={Admin} />,
	},
	{
		path: '/admin/books',
		element: <LazyRoute component={AdminBooks} />,
	},
	{
		path: '/admin/clients',
		element: <LazyRoute component={AdminClients} />,
	},
	{
		path: '/admin/books/create',
		element: <LazyRoute component={AdminCreateBook} />,
	},
	{
		path: '/admin/clients/create',
		element: <LazyRoute component={AdminCreateClient} />,
	},
	{
		path: '/admin/books/edit/:id',
		element: <LazyRoute component={AdminEditBook} />,
	},
	{
		path: '/admin/clients/edit/:id',
		element: <LazyRoute component={AdminEditClient} />,
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
		path:'/search',
		element:<Search/>
	}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />
);

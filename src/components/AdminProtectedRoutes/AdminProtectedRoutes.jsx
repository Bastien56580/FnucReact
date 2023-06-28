import { Suspense } from 'react';
import Loading from '../../view/Loading/Loading';
import jwt_decode from 'jwt-decode';

/**
 * Middleware qui vérifie si l'utilsateur est admin pour charger les pages d'administration
 * @param {object} param0 : 
 * 	- component : Composant à retourner si l'utilisateur est bien admin
 *  - rest : props du composant
 */
const AdminProtectedRoutes = ({ component: Component, ...rest }) => {
	const token = sessionStorage.getItem('token');
	let ret = false;

	if (sessionStorage.getItem('token')) {
		let decoded_token = jwt_decode(token);
		if (decoded_token.role === 'admin') {
			ret = true;
		}
	}
	return (
		<Suspense fallback={<Loading />}>
			{ret ? <Component {...rest} /> : window.location.replace('/')}
		</Suspense>
	);
};

export default AdminProtectedRoutes;

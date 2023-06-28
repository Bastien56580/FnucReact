import { Suspense } from 'react';
import Loading from '../../view/Loading/Loading';

/**
 * Middleware qui vérifie si l'utilsateur est connecté pour charger les pages protégées
 * @param {object} param0 : 
 * 	- component : Composant à retourner si l'utilisateur est bien connecté
 *  - rest : props du composant
 */
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = sessionStorage.getItem('token');

  return (
    <Suspense fallback={<Loading />}>
      {token ? <Component {...rest} /> : window.location.replace('/')}
    </Suspense>
  );
};

export default ProtectedRoute;
import { Suspense } from 'react';
import Loading from '../../view/Loading/Loading';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = sessionStorage.getItem('token');

  return (
    <Suspense fallback={<Loading />}>
      {token ? <Component {...rest} /> : window.location.replace('/')}
    </Suspense>
  );
};

export default ProtectedRoute;
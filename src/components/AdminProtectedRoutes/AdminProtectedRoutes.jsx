
import { Suspense } from 'react';
import Loading from '../../view/Loading/Loading';
import jwt_decode from "jwt-decode";

const AdminProtectedRoutes = ({ component: Component, ...rest }) => {
  const token = sessionStorage.getItem('token');
  let ret = false;
  let decoded_token = jwt_decode(token);
			if(decoded_token.role==="admin"){
				ret=true;
			}

  return (
    <Suspense fallback={<Loading />}>
      {ret ? <Component {...rest} /> : window.location.replace('/')}
    </Suspense>
  );
};

export default AdminProtectedRoutes;
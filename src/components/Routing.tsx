import CircularProgress from '@material-ui/core/CircularProgress';
import { ROUTES } from 'helpers/constants';
import cookies from 'js-cookie';
import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { RootState, useAppDispatch } from 'store';
import { setToken } from 'store/reducers/auth';

const Account = React.lazy(() => import('components/account'));
const Auth = React.lazy(() => import('components/auth'));
const Routing: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = useSelector<RootState>((state) => state.auth.token) || cookies.get('token');

  const cookieToken = cookies.get('token');

  if (cookieToken && token !== cookieToken) {
    dispatch(setToken(cookieToken));
  }
  return (
    <>
      <Redirect from="*" to={token ? ROUTES.account : ROUTES.login} />
      <Suspense fallback={<CircularProgress />}>
        {token ? <Route to={ROUTES.account} component={Account} /> : <Auth />}
      </Suspense>
    </>
  );
};

export default Routing;

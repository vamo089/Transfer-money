import CircularProgress from '@material-ui/core/CircularProgress';
import { ROUTES } from 'helpers/constants';
import cookies from 'js-cookie';
import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, useHistory, useLocation } from 'react-router-dom';
import { RootState, useAppDispatch } from 'store';
import { setToken } from 'store/reducers/auth';

const Account = React.lazy(() => import('components/account'));
const Auth = React.lazy(() => import('components/auth'));

export const Routing: React.FC = () => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    history.push(token ? ROUTES.account : ROUTES.login);
  }, [location]);

  const dispatch = useAppDispatch();
  const token = useSelector<RootState>((state) => state.auth.token) || cookies.get('token');
  const cookieToken = cookies.get('token');

  if (cookieToken && token !== cookieToken) {
    dispatch(setToken(cookieToken));
  }
  return (
    <>
      <Suspense fallback={<CircularProgress />}>
        <Route path={ROUTES.login}>
          <Auth />
        </Route>
        <Route path={ROUTES.account}>
          <Account />
        </Route>
      </Suspense>
    </>
  );
};

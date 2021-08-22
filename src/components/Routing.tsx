import CircularProgress from '@material-ui/core/CircularProgress';
import { ROUTES } from 'helpers/constants';
import cookies from 'js-cookie';
import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import { RootState, useAppDispatch } from 'store';
import { setToken } from 'store/reducers/auth';

const Account = React.lazy(() => import('components/account'));
const Auth = React.lazy(() => import('components/auth'));
export const Routing: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const token = useSelector<RootState>((state) => state.auth.token) || cookies.get('token');
  const cookieToken = cookies.get('token');
  if (cookieToken && token !== cookieToken) {
    dispatch(setToken(cookieToken));
  }

  useEffect(() => {
    history.push(token ? ROUTES.account : ROUTES.login);
  }, [token]);

  return (
    <>
      <Suspense fallback={<CircularProgress />}>
        {token ? <Route to={ROUTES.account} component={Account} /> : <Auth />}
      </Suspense>
    </>
  );
};

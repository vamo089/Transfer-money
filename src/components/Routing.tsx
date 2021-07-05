import { Account } from 'components/account/Account';
import { Auth } from 'components/auth/Auth';
import { ROUTES } from 'helpers/constants';
import cookies from 'js-cookie';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { RootState, useAppDispatch } from 'store';
import { setToken } from 'store/reducers/auth';

const Routing: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = useSelector<RootState, string | null>((state) => state.auth.token) || cookies.get('token');

  const cookieToken = cookies.get('token');

  if (cookieToken && token !== cookieToken) {
    dispatch(setToken(cookieToken));
  }
  return (
    <>
      <Redirect from="*" to={token ? ROUTES.account : ROUTES.login} />
      {token ? <Route to={ROUTES.account} component={Account} /> : <Auth />}
    </>
  );
};

export default Routing;

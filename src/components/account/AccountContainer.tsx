import useTheme from '@material-ui/core/styles/useTheme';
import { logout } from 'helpers/logout';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getListOfTransactions } from 'services/getListOfTransactions';
import { getUserInfo } from 'services/getUserInfo';
import { setPreviousTransactionData, setUserData } from 'store/actions/account';

import { Account } from './Account';

export const AccountContainer: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isSessionExpired = (message: string) => message === 'UnauthorizedError: jwt expired';
  const theme = useTheme();

  useEffect(() => {
    getUserInfo().then((userInfoToken) => dispatch(setUserData(userInfoToken)));

    getListOfTransactions()
      .then((data) => dispatch(setPreviousTransactionData(data)))
      .catch(({ response }) => isSessionExpired(response.data.trim()) && logout(history));
  }, []);

  return <Account theme={theme} />;
};

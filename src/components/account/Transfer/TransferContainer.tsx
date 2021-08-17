import { yupResolver } from '@hookform/resolvers';
import Snackbar, { SnackbarProps } from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Color } from '@material-ui/lab/Alert/Alert';
import { logout } from 'helpers/logout';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { createTransaction } from 'services/createTransaction';
import { getListOfTransactions } from 'services/getListOfTransactions';
import { getUserInfo } from 'services/getUserInfo';
import { setPreviousTransactionData, setUserData } from 'store/actions/account';
import { number, object, string } from 'yup';

import { useAppDispatch } from '../../../store';
import { Transfer } from './Transfer';

export interface TransferInitialValues {
  username: string;
  sum: number;
}

export const TransferContainer: React.FC = () => {
  const history = useHistory();
  const [mainButtonLoader, setMainButtonLoader] = useState<boolean>(false);
  const [alertMessageStatus, setAlertMessageStatus] = useState<{ open: boolean; message: string; severity?: Color }>({
    open: false,
    message: '',
    severity: 'info'
  });

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    trigger,
    formState: { isValid }
  } = useForm<TransferInitialValues>({
    resolver: yupResolver(
      object({
        username: string(),
        sum: number().positive().required()
      })
    ),
    mode: 'all',
    defaultValues: {
      username: '',
      sum: 0
    }
  });

  const onSubmit = async (values: TransferInitialValues) => {
    const { username, sum } = values;

    setMainButtonLoader(true);

    const currentBalance = await getUserInfo()
      .then(({ balance }) => balance)
      .catch(({ response }) => response.data === 'UnauthorizedError' && logout(history));

    if (sum <= currentBalance) {
      createTransaction(username, sum.toString()).then((token) => {
        setAlertMessageStatus({ open: true, message: `You sent ${sum} to ${username}` });
        setValue('sum', 0, { shouldValidate: true });

        dispatch(setUserData({ ...token }));
        getListOfTransactions().then((data) => dispatch(setPreviousTransactionData(data)));
      });
    } else {
      setAlertMessageStatus({ open: true, message: 'Sorry you have insufficient funds available', severity: 'error' });
    }
    setMainButtonLoader(false);
  };

  const alertMessageClose: SnackbarProps['onClose'] = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertMessageStatus({ open: false, message: '' });
  };
  return (
    <>
      <Transfer
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        getValues={getValues()}
        mainButtonLoader={mainButtonLoader}
        isValid={isValid}
        trigger={trigger}
        setValue={setValue}
      />
      <Snackbar
        autoHideDuration={2000}
        open={alertMessageStatus.open}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={alertMessageClose}
      >
        <MuiAlert elevation={4} variant="filled" severity={alertMessageStatus.severity}>
          {alertMessageStatus.message}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

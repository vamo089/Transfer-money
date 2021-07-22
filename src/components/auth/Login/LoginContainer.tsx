import { yupResolver } from '@hookform/resolvers';
import Snackbar, { SnackbarProps } from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Login } from 'components/auth/Login/Login';
import { ROUTES } from 'helpers/constants';
import cookies from 'js-cookie';
import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginRequest } from 'services/loginRequest';
import { RootState, useAppDispatch } from 'store';
import { setEmail, setToken } from 'store/reducers/auth';
import { object, string } from 'yup';

export interface LoginInitialValues {
  email: string;
  password: string;
}

const validationSchema = object({
  email: string().email().required(),
  password: string().min(6).required()
});

export const LoginContainer: React.FC = () => {
  const history = useHistory();
  const [alertMessageStatus, setAlertMessageStatus] = useState({ open: false, message: null });

  const [mainButtonLoader, setMainButtonLoader] = useState(false);

  const dispatch = useAppDispatch();
  const savedEmail = useSelector<RootState, string>((state) => state.auth.email);

  const {
    register,
    handleSubmit,
    errors,
    formState: { isValid }
  } = useForm<LoginInitialValues>({
    resolver: yupResolver(validationSchema),
    mode: 'all',
    defaultValues: {
      email: savedEmail
    }
  });

  const onSubmit = ({ email, password }: LoginInitialValues) => {
    setMainButtonLoader(true);
    loginRequest(email, password)
      .then(({ id_token }) => {
        cookies.set('token', id_token);
        history.push(ROUTES.account);
        dispatch(setToken(id_token));
      })
      .catch(({ response }) => setAlertMessageStatus({ open: true, message: response.data }))
      .finally(() => setMainButtonLoader(false));
  };

  const emailChange = (value: ChangeEvent<HTMLInputElement>) => {
    const emailValue = value.target.value;
    const { email: emailError } = errors;
    if (emailError && savedEmail !== emailValue) {
      dispatch(setEmail(emailValue));
    }
  };

  const alertMessageClose: SnackbarProps['onClose'] = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertMessageStatus({ open: false, message: null });
  };

  return (
    <>
      <Login register={register} onSubmit={handleSubmit(onSubmit)} emailChange={emailChange} mainButtonLoader={mainButtonLoader} isValid={isValid} />
      <Snackbar autoHideDuration={2000} open={alertMessageStatus.open} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={alertMessageClose}>
        <MuiAlert elevation={4} variant="filled" severity="error">
          {alertMessageStatus.message}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default LoginContainer;

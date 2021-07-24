import { yupResolver } from '@hookform/resolvers';
import Snackbar, { SnackbarProps } from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Registration } from 'components/auth/Registration/Registration';
import { ROUTES } from 'helpers/constants';
import cookies from 'js-cookie';
import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { registrationRequest } from 'services/registrationRequest';
import { RootState } from 'store';
import { setEmail, setToken } from 'store/actions/auth';
import { object, ref, string } from 'yup';

export interface RegistrationInitialValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = object({
  username: string().min(3).required(),
  email: string().email().required(),
  password: string().min(6).required(),
  confirmPassword: string()
    .min(6)
    .oneOf([ref('password'), null])
    .required()
});

export const RegistrationContainer: React.FC = () => {
  const history = useHistory();
  const [alertMessageStatus, setAlertMessageStatus] = useState({ open: false, message: null });
  const [mainButtonLoader, setMainButtonLoader] = useState<boolean>(false);

  const dispatch = useDispatch();

  const savedEmail = useSelector<RootState, string>((state) => state.auth.email);

  const {
    register,
    handleSubmit,
    errors,
    formState: { isValid }
  } = useForm<RegistrationInitialValues>({
    resolver: yupResolver(validationSchema),
    mode: 'all',
    defaultValues: {
      username: '',
      email: savedEmail,
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = (values: RegistrationInitialValues) => {
    const { username, email, password } = values;
    setMainButtonLoader(true);
    registrationRequest(username, password, email)
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
      <Registration
        register={register}
        onSubmit={handleSubmit(onSubmit)}
        emailChange={emailChange}
        mainButtonLoader={mainButtonLoader}
        isValid={isValid}
      />
      <Snackbar
        autoHideDuration={2000}
        open={alertMessageStatus.open}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={alertMessageClose}
      >
        <MuiAlert elevation={4} variant="filled" severity="error">
          {alertMessageStatus.message}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

import { yupResolver } from '@hookform/resolvers';
import { Login } from 'components/auth/Login/Login';
import { ROUTES } from 'helpers/constants';
import cookies from 'js-cookie';
import { useSnackbar } from 'notistack';
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

export const LoginContainer = () => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [mainButtonLoader, setMainButtonLoader] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const savedEmail = useSelector<RootState, string>((state) => state.auth.email);

  const {
    register,
    handleSubmit,
    getValues,
    errors,
    formState: { isValid }
  } = useForm<LoginInitialValues>({
    resolver: yupResolver(validationSchema),
    mode: 'all',
    defaultValues: {
      email: savedEmail
    }
  });

  const onSubmit = (values: LoginInitialValues) => {
    const { email, password } = values;
    setMainButtonLoader(true);
    loginRequest(email, password)
      .then(({ id_token }) => {
        cookies.set('token', id_token);
        history.push(ROUTES.account);
        dispatch(setToken(id_token));
      })
      .catch(({ response }) => enqueueSnackbar(response.data, { variant: 'error' }))
      .finally(() => setMainButtonLoader(false));
  };

  const emailChange = (value: ChangeEvent<HTMLInputElement>) => {
    const { email: emailValue } = getValues();
    const { email: emailError } = errors;

    if (emailValue && !emailError && savedEmail !== emailValue) {
      dispatch(setEmail(value.target.value));
    }
  };

  return <Login register={register} onSubmit={handleSubmit(onSubmit)} emailChange={emailChange} mainButtonLoader={mainButtonLoader} isValid={isValid} />;
};

export default LoginContainer;

import React, { ChangeEvent, useState } from "react";
import { object, ref, string } from "yup";
import { registrationRequest } from "services/registrationRequest";
import cookies from "js-cookie";
import { useSnackbar } from "notistack";
import { ROUTES } from "helpers/constants";
import { Registration } from "components/auth/Registration/Registration";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setEmail, setToken } from "store/actions/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import {useHistory} from "react-router-dom";

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
    .oneOf([ref("password"), null])
    .required(),
});

export const RegistrationContainer = () => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [mainButtonLoader, setMainButtonLoader] = useState<boolean>(false);

  const dispatch = useDispatch();

  const savedEmail = useSelector<RootState, string>(
    (state) => state.auth.email
  );

  const {
    register,
    handleSubmit,
    getValues,
    errors,
    formState: { isValid },
  } = useForm<RegistrationInitialValues>({
    resolver: yupResolver(validationSchema),
    mode: "all",
    defaultValues: {
      username: "",
      email: savedEmail,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: RegistrationInitialValues) => {
    const { username, email, password } = values;
    setMainButtonLoader(true);
    registrationRequest(username, password, email)
      .then(({ id_token }) => {
        cookies.set("token", id_token);
        history.push(ROUTES.account);
        dispatch(setToken(id_token));
      })
      .catch(({ response }) =>
        enqueueSnackbar(response.data, { variant: "error" })
      )
      .finally(() => setMainButtonLoader(false));
  };

  const emailChange = (value: ChangeEvent<HTMLInputElement>) => {
    const { email: emailValue } = getValues();
    const { email: emailError } = errors;
    if (emailValue && !emailError && savedEmail !== emailValue) {
      dispatch(setEmail(value.target.value));
    }
  };

  return (
    <Registration
      register={register}
      onSubmit={handleSubmit(onSubmit)}
      emailChange={emailChange}
      mainButtonLoader={mainButtonLoader}
      isValid={isValid}
    />
  );
};

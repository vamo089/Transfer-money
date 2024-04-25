import { yupResolver } from "@hookform/resolvers";
// import MuiAlert from "@mui/material/Alert";
// import Snackbar from "@mui/material/Snackbar";
import cookies from "js-cookie";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { Registration } from "src/modules/auth/components/Registration/Registration";
import { registration, setEmail } from "src/modules/auth/store/reducer";
import { selectEmail, selectToken } from "src/modules/auth/store/selectors";
import { IRegistrationParams } from "src/modules/auth/store/types";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { object, ref, string } from "yup";

export type RegistrationInitialValues = IRegistrationParams & {
  confirmPassword: string;
};

const validationSchema = object({
  username: string().min(3).required(),
  email: string().email().required(),
  password: string().min(6).required(),
  confirmPassword: string()
    .min(6)
    .oneOf([ref("password"), null])
    .required()
});

export const RegistrationWidget: React.FC = () => {
  // const [alertMessageStatus] = useState({ open: false, message: null });
  const [mainButtonLoader, setMainButtonLoader] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const savedEmail = useAppSelector(selectEmail);
  const token = useAppSelector(selectToken);

  const {
    register,
    handleSubmit,
    errors,
    formState: { isValid }
  } = useForm<RegistrationInitialValues>({
    resolver: yupResolver(validationSchema),
    mode: "all",
    defaultValues: {
      username: "",
      email: savedEmail,
      password: "",
      confirmPassword: ""
    }
  });

  const onSubmit = (values: RegistrationInitialValues) => {
    try {
      dispatch(registration(values));
      if (token) {
        cookies.set("token", token);
      }
    } catch (err) {
      // console.log(err);
      // setAlertMessageStatus({ open: true, message: err });
    } finally {
      setMainButtonLoader(false);
    }
  };

  const emailChange = (value: ChangeEvent<HTMLInputElement>) => {
    const emailValue = value.target.value;
    const { email: emailError } = errors;
    if (emailError && savedEmail !== emailValue) {
      dispatch(setEmail(emailValue));
    }
  };

  // const alertMessageClose: SnackbarProps['onClose'] = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }
  //   setAlertMessageStatus({ open: false, message: null });
  // };

  return (
    <>
      <Registration
        register={register}
        onSubmit={handleSubmit(onSubmit)}
        emailChange={emailChange}
        mainButtonLoader={mainButtonLoader}
        isValid={isValid}
      />
    </>
  );
};

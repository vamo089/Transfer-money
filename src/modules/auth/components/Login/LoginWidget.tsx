import { yupResolver } from "@hookform/resolvers";
import React, { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { Login } from "src/modules/auth/components/Login/Login";
import { login, setEmail } from "src/modules/auth/store/reducer";
import { selectEmail, selectIsLoadingAuth } from "src/modules/auth/store/selectors";
import { ILoginParams } from "src/modules/auth/store/types";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { object, string } from "yup";

const validationSchema = object({
  email: string().email().required(),
  password: string().min(6).required()
});

export const LoginWidget: React.FC = () => {
  // const [alertMessageStatus, setAlertMessageStatus] = useState({ open: false, message: "" });

  const dispatch = useAppDispatch();
  const savedEmail = useAppSelector(selectEmail);
  const isLoading = useAppSelector(selectIsLoadingAuth);
  // const hasError = useAppSelector(selectIsRejectedAuth);

  // useEffect(() => {
  //   if (hasError) {
  //     setAlertMessageStatus({ open: true, message: "" });
  //   }
  //   console.log(hasError);
  // }, [hasError]);

  const {
    register,
    handleSubmit,
    errors,
    formState: { isValid }
  } = useForm<ILoginParams>({
    resolver: yupResolver(validationSchema),
    mode: "all",
    defaultValues: {
      email: savedEmail
    }
  });

  const onSubmit = ({ email, password }: ILoginParams) => {
    dispatch(login({ email, password }));
  };

  const emailChange = (value: ChangeEvent<HTMLInputElement>) => {
    const emailValue = value.target.value;
    const { email: emailError } = errors;
    if (emailError && savedEmail !== emailValue) {
      dispatch(setEmail(emailValue));
    }
  };

  // const alertMessageClose: SnackbarProps["onClose"] = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setAlertMessageStatus({ open: false, message: "" });
  // };

  return (
    <>
      <Login
        register={register}
        onSubmit={handleSubmit(onSubmit)}
        emailChange={emailChange}
        mainButtonLoader={isLoading}
        isValid={isValid}
      />
      {/* {alertMessageStatus.open && (*/}
      {/*  <Snackbar*/}
      {/*    autoHideDuration={2000}*/}
      {/*    open*/}
      {/*    // anchorOrigin={{ vertical: "top", horizontal: "right" }}*/}
      {/*    // onClose={alertMessageClose}*/}
      {/*  >*/}
      {/*    <Alert elevation={4} variant="filled" severity="error">*/}
      {/*      {alertMessageStatus.message}*/}
      {/*    </Alert>*/}
      {/*  </Snackbar>*/}
      {/* )}*/}
    </>
  );
};

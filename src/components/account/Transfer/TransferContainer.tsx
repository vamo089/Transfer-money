import React, { useState } from "react";
import { object, string } from "yup";
import { Formik } from "formik";
import { Typography, Card } from "@material-ui/core";
import { getUserInfo } from "services/getUserInfo";
import { useSnackbar } from "notistack";
import { debounce } from "helpers/debounce";
import { createTransaction } from "services/createTransaction";
import { logout } from "helpers/logout";
import { getListOfTransactions } from "services/getListOfTransactions";
import { useDispatch } from "react-redux";
import { setPreviousTransactionData, setUserData } from "store/actions/account";
import { Transfer, Container, Toolbar } from "./Transfer";

export interface TransferInitialValues {
  username: string;
  sum: string;
}

const currentUserBalance = debounce(() => {
  return getUserInfo()
    .then((user_info_token) => user_info_token.balance)
    .catch(({ response }) => response.data === "UnauthorizedError" && logout());
}, 1000);

export const TransferContainer = () => {
  const [mainButtonLoader, setMainButtonLoader] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const initialValues: TransferInitialValues = {
    username: "",
    sum: "",
  };
  const onSubmit = (
    values: TransferInitialValues,
    setFieldValue: {
      (field: string, value: any, shouldValidate?: boolean | undefined): void;
      (arg0: string, arg1: string): void;
    }
  ) => {
    const { username, sum } = values;
    setMainButtonLoader(true);
    let balance = currentUserBalance().then((data) => data);

    balance.then((balance) => {
      if (parseInt(sum) <= balance) {
        createTransaction(username, sum).then(({ trans_token }) => {
          enqueueSnackbar(`You sent ${sum} to ${username}`, {
            variant: "info",
          });
          setFieldValue("sum", "");
          dispatch(setUserData({ ...trans_token }));
          getListOfTransactions().then((data) =>
            dispatch(setPreviousTransactionData(data))
          );
        });
      } else {
        enqueueSnackbar("Sorry you have insufficient funds available", {
          variant: "error",
        });
      }
      setMainButtonLoader(false);
    });
  };

  return (
    <Card>
      <Toolbar>
        <Typography variant="h6" component="div">
          Create transaction
        </Typography>
      </Toolbar>
      <Container>
        <Formik
          validateOnMount
          initialValues={initialValues}
          validationSchema={object({
            username: string().required(),
            sum: string().required(),
          })}
          onSubmit={(values, { setFieldValue }) =>
            onSubmit(values, setFieldValue)
          }
        >
          {(params) => {
            const { values, isValid, handleChange, setFieldValue } = params;
            return (
              <Transfer
                values={values}
                isValid={isValid}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
                mainButtonLoader={mainButtonLoader}
              />
            );
          }}
        </Formik>
      </Container>
    </Card>
  );
};

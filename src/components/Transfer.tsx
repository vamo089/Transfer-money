import React, { useState } from "react";
import styled from "styled-components";
import { object, string } from "yup";
import { Form, Formik } from "formik";
import { TextField } from "components/TextField/TextField";
import { MainButton } from "components/MainButton/MainButton";
import { Users } from "components/Users";
import { Typography, Card, Grid, Toolbar as _Toolbar } from "@material-ui/core";
import { getUserInfo, UserInfo } from "services/getUserInfo";

import { useSnackbar } from "notistack";
import { debounce } from "helpers/debounce";
import { createTransaction } from "services/createTransaction";
import { logout } from "helpers/logout";
import { theme } from "helpers/theme";
import { getListOfTransactions } from "services/getListOfTransactions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setPreviousTransactionData, setUserData } from "store/actions/account";

const Container = styled.div`
  padding: 35px;
`;

const Toolbar = styled(_Toolbar)`
  border-bottom: 1px solid ${theme.colors.primary};
`;

const currentUserBalance = debounce(() => {
  return getUserInfo()
    .then((user_info_token) => user_info_token.balance)
    .catch(({ response }) => response.data === "UnauthorizedError" && logout());
}, 1000);

export const Transfer = () => {
  const [mainButtonLoader, setMainButtonLoader] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const transferUserData = useSelector<
    RootState,
    Omit<UserInfo, "balance" | "email"> | null
  >((state) => state.account.transferUserData);

  const onSubmit = (
    values: { username: string; sum: string },
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
          initialValues={{
            username: "",
            sum: "",
          }}
          validationSchema={object({
            username: string().required(),
            sum: string().required(),
          })}
          onSubmit={(values, { setFieldValue }) =>
            onSubmit(values, setFieldValue)
          }
        >
          {(params) => {
            const { values, isValid, handleChange } = params;
            const autocompleteValue =
              values.username === transferUserData?.name;
            return (
              <Form>
                <Users {...params} />
                <TextField
                  onChange={handleChange}
                  variant="outlined"
                  name="sum"
                  label="The sum"
                  type="number"
                  autoComplete="off"
                  value={values.sum}
                  fullWidth
                />

                <Grid item xs={6}>
                  <MainButton
                    disabled={!isValid || !autocompleteValue}
                    type="submit"
                    variant="outlined"
                    loader={mainButtonLoader ? 1 : 0}
                    fullWidth
                  >
                    Transfer
                  </MainButton>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </Card>
  );
};

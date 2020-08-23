import React from "react";
import styled from "styled-components";
import { Form } from "formik";
import { TextField } from "components/TextField/TextField";
import { MainButton } from "components/MainButton/MainButton";
import { Users } from "components/Users";
import { Grid, Toolbar as _Toolbar } from "@material-ui/core";
import { UserInfo } from "services/getUserInfo";
import { theme } from "helpers/theme";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { FormikHandlers } from "formik/dist/types";
import { TransferInitialValues } from "./TransferContainer";

export const Container = styled.div`
  padding: 35px;
`;

export const Toolbar = styled(_Toolbar)`
  border-bottom: 1px solid ${theme.colors.primary};
`;

interface Props {
  values: TransferInitialValues;
  isValid: boolean;
  mainButtonLoader: boolean;
  handleChange: FormikHandlers["handleChange"];
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

export const Transfer = ({
  values,
  mainButtonLoader,
  isValid,
  handleChange,
  setFieldValue,
}: Props) => {
  const transferUserData = useSelector<
    RootState,
    Omit<UserInfo, "balance" | "email"> | null
  >((state) => state.account.transferUserData);

  const autocompleteValue = values.username === transferUserData?.name;

  return (
    <Form>
      <Users
        values={values}
        handleChange={handleChange}
        setFieldValue={setFieldValue}
      />
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
};

import React, { FormEvent } from "react";
import { useSelector } from "react-redux";
import { UseFormMethods } from "react-hook-form";
import { UnpackNestedValue } from "react-hook-form/dist/types/form";
import styled from "styled-components";
import { Card, Grid, Toolbar as _Toolbar, Typography } from "@material-ui/core";
import { RootState } from "store";
import { TextField } from "components/TextField/TextField";
import { MainButton } from "components/MainButton/MainButton";
import { Users } from "components/Users";
import { theme } from "helpers/theme";
import { TransferInitialValues } from "components/account/Transfer/TransferContainer";
import {FilterUserListData} from "services/filterUserList";

const Container = styled.div`
  padding: 35px;
`;

const Toolbar = styled(_Toolbar)`
  border-bottom: 1px solid ${theme.colors.primary};
`;

interface Props {
  isValid: boolean;
  mainButtonLoader: boolean;
  register: UseFormMethods["register"];
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  getValues: UnpackNestedValue<TransferInitialValues>;
}

export const Transfer = ({
  mainButtonLoader,
  isValid,
  onSubmit,
  register,
  getValues,
}: Props) => {
  const transferUserData = useSelector<RootState, FilterUserListData | null>(
    (state) => state.account.transferUserData
  );

  const autocompleteValue = getValues.username === transferUserData?.name;

  return (
    <Card>
      <Toolbar>
        <Typography variant="h6" component="div">
          Create transaction
        </Typography>
      </Toolbar>
      <Container>
        <form onSubmit={onSubmit}>
          <Users register={register} />
          <TextField
            variant="outlined"
            name="sum"
            label="The sum"
            type="number"
            autoComplete="off"
            fullWidth
            inputRef={register}
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
        </form>
      </Container>
    </Card>
  );
};

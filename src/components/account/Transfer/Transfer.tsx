import { Card, Grid, Toolbar as _Toolbar, Typography } from '@material-ui/core';
import { TransferInitialValues } from 'components/account/Transfer/TransferContainer';
import { MainButton } from 'components/MainButton/MainButton';
import { TextField } from 'components/TextField/TextField';
import { Users } from 'components/Users';
import { theme } from 'helpers/theme';
import React, { FormEvent } from 'react';
import { UseFormMethods } from 'react-hook-form';
import { UnpackNestedValue } from 'react-hook-form/dist/types/form';
import { useSelector } from 'react-redux';
import { FilterUserListData } from 'services/filterUserList';
import { RootState } from 'store/index';
import styled from 'styled-components';

const Container = styled.div`
  padding: 35px;
`;

const Toolbar = styled(_Toolbar)`
  border-bottom: 1px solid ${theme.colors.primary};
`;

interface Props {
  isValid: boolean;
  mainButtonLoader: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  getValues: UnpackNestedValue<TransferInitialValues>;
  setValue: UseFormMethods<TransferInitialValues>['setValue'];
  trigger: UseFormMethods<TransferInitialValues>['trigger'];
  register: UseFormMethods<TransferInitialValues>['register'];
}

export const Transfer = ({ mainButtonLoader, isValid, onSubmit, register, getValues, trigger, setValue }: Props) => {
  const transferUserData = useSelector<RootState, FilterUserListData | null>((state) => state.account.transferUserData);
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
          <Users register={register} trigger={trigger} setValue={setValue} />
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

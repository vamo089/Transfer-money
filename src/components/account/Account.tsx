import { Box, Grid, Theme } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import { Header } from 'components/Header';
import { theme } from 'helpers/theme';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { ListOfTransactions } from '../ListOfTransactions/ListOfTransactions';
import { TransferContainer } from './Transfer/TransferContainer';

const MainContainer = styled(Grid)`
  ${(props) => props.theme.breakpoints.up('sm')} {
    width: 80% !important;
  }
  margin-right: auto;
  margin-left: auto;
`;
const Container = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background: ${theme.colors.secondary};
  box-sizing: border-box;
`;
type Props = {
  theme: Theme;
};
export const Account: React.FC<Props> = ({ theme }) => (
  <StylesProvider injectFirst>
    <ThemeProvider theme={theme}>
      <MainContainer wrap="nowrap" direction="column" container>
        <Header />
        <Container container justify="center">
          <Grid container justify="space-around">
            <Grid item xs={11} lg={5}>
              <TransferContainer />
            </Grid>

            <Grid item xs={11} lg={5}>
              <Box display={{ xs: 'block', lg: 'none' }} mt="20px" />
              <ListOfTransactions />
            </Grid>
          </Grid>
        </Container>
      </MainContainer>
    </ThemeProvider>
  </StylesProvider>
);

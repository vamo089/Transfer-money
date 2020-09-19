import styled, { ThemeProvider } from "styled-components";
import { useTheme, StylesProvider } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { Grid, Box } from "@material-ui/core";
import { theme } from "helpers/theme";
import { logout } from "helpers/logout";
import { Header } from "components/Header";
import { getUserInfo } from "services/getUserInfo";
import { ListOfTransactions } from "components/ListOfTransactions";
import {
  getListOfTransactions,
} from "services/getListOfTransactions";
import { setPreviousTransactionData, setUserData } from "store/actions/account";
import { useDispatch } from "react-redux";
import { TransferContainer } from "./Transfer/TransferContainer";
import {useHistory} from "react-router-dom";

const MainContainer = styled(Grid)`
  ${(props) => props.theme.breakpoints.up("sm")} {
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

export const Account = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    getUserInfo()
      .then((user_info_token) => dispatch(setUserData(user_info_token)))
      .catch(
        ({ response }) =>
          "UnauthorizedError: jwt expired" === response.data.trim() && logout(history)
      );

    getListOfTransactions()
      .then((data) => dispatch(setPreviousTransactionData(data)))
      .catch(({ response }) => {
        "UnauthorizedError: jwt expired" === response.data.trim() && logout(history);
      });
  });
  const theme = useTheme();
  return (
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
                <Box display={{ xs: "block", lg: "none" }} mt="20px" />
                <ListOfTransactions />
              </Grid>
            </Grid>
          </Container>
        </MainContainer>
      </ThemeProvider>
    </StylesProvider>
  );
};

import styled, { ThemeProvider } from "styled-components";
import { useTheme, StylesProvider } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { Grid, Box } from "@material-ui/core";
import { theme } from "helpers/theme";
import { logout } from "helpers/logout";
import { createState } from "helpers/createState";
import { Header } from "components/Header";
import { Transfer } from "components/Transfer";
import { getUserInfo, UserInfo } from "services/getUserInfo";
import { ListOfTransactions } from "components/ListOfTransactions";
import {
  getListOfTransactions,
  TransactionResponse,
} from "services/getListOfTransactions";

const MainContainer = styled(Grid)`
  ${props => props.theme.breakpoints.up("sm")} {
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

export const userNameData = createState<Omit<UserInfo, "id" | "email">>({
  name: "",
  balance: 0,
});

export const previousTransactionData = createState<TransactionResponse[]>([]);

export const Account = () => {
  useEffect(() => {
    getUserInfo()
      .then((user_info_token) => userNameData.set(user_info_token))
      .catch(
        ({ response }) =>
          "UnauthorizedError: jwt expired" === response.data.trim() && logout()
      );

    getListOfTransactions()
      .then((data) => previousTransactionData.set(data))
      .catch(({ response }) => {
        "UnauthorizedError: jwt expired" === response.data.trim() && logout();
      });
  }, []);
  const theme = useTheme();
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <MainContainer wrap="nowrap" direction="column" container>
          <Header />
          <Container container justify="center">
            <Grid container justify="space-around">
              <Grid item xs={11} lg={5}>
                <Transfer />
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

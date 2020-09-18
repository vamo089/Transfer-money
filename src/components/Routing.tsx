import React from "react";
import { Redirect, Route } from "react-router-dom";
import cookies from "js-cookie";
import { ROUTES } from "helpers/constants";
import { Account } from "components/account/Account";
import { Auth } from "components/auth/Auth";
import { useSelector } from "react-redux";
import { dispatch, RootState } from "store";
import { setToken } from "store/actions/auth";

const Routing = () => {
  const token =
    useSelector<RootState, string | null>((state) => state.auth.token) ||
    cookies.get("token");

  const cookieToken = cookies.get("token");
  if (cookieToken && token !== cookieToken) {
    dispatch(setToken(cookieToken));
  }
  return (
    <>
      <Redirect from="*" to={token ? ROUTES.account : ROUTES.login} />
      {token ? <Route to={ROUTES.account} component={Account} /> : <Auth />}
    </>
  );
};

export default Routing;

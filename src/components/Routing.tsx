import React from "react";
import { Redirect, Route } from "react-router-dom";
import cookies from "js-cookie";
import { ROUTES } from "helpers/constants";
import { Account } from "components/Account";
import { Auth } from "components/auth/Auth";
import { useSelector } from "react-redux";
import { RootState } from "store";

const Routing = () => {
  const token =
    useSelector<RootState, string | null>((state) => state.auth.token) ||
    cookies.get("token");
  return (
    <>
      <Redirect from="*" to={token ? ROUTES.account : ROUTES.login} />
      {token ? <Route to={ROUTES.account} component={Account} /> : <Auth />}
    </>
  );
};

export default Routing;

import Cookies from "js-cookie";
import { history } from "App";
import { ROUTES } from "helpers/constants";
import { removeToken } from "store/actions/auth";
import { dispatch } from "store";

export const logout = () => {
  dispatch(removeToken());
  Cookies.remove("token");
  history.push(ROUTES.login);
};

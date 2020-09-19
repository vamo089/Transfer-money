import Cookies from "js-cookie";
import { ROUTES } from "helpers/constants";
import { removeToken } from "store/actions/auth";
import { dispatch } from "store";
import {History} from "history";

export const logout = (history: History<History.LocationState>) => {
  dispatch(removeToken());
  Cookies.remove("token");
  history.push(ROUTES.login);
};

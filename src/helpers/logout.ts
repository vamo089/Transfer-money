import {token} from "components/Auth";
import Cookies from "js-cookie";
import {history} from "App";
import {ROUTES} from "helpers/constants";

export const logout = () =>{
  token.set(null);
  Cookies.remove("token");
  history.push(ROUTES.login);
};

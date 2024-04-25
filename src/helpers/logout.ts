import { ROUTES } from "helpers/constants";
import { History } from "history";
import Cookies from "js-cookie";
import { removeToken } from "src/modules/auth/store/reducer";
import { store } from "src/store";

export const logout = (history: History<History.LocationState>) => {
  store.dispatch(removeToken());
  Cookies.remove("token");
  history.push(ROUTES.login);
};

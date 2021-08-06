import { ROUTES } from 'helpers/constants';
import { History } from 'history';
import Cookies from 'js-cookie';
import { dispatch } from 'store';
import { removeToken } from 'store/reducers/auth';

export const logout = (history: History<History.LocationState>) => {
  dispatch(removeToken());
  Cookies.remove('token');
  history.push(ROUTES.login);
};

import axios from 'axios';
import { BASE_URL } from 'helpers/constants';
import cookies from 'js-cookie';
import { UserInfo } from 'services/getUserInfo';

type CreateTransaction = (name: string, amount: string) => Promise<UserInfo>;

export const createTransaction: CreateTransaction = (name, amount) =>
  axios
    .get<{ 'trans_token': UserInfo }>(`${BASE_URL}/api/protected/transactions`, {
      params: { name, amount },
      headers: {
        Authorization: `Bearer ${cookies.get('token')}`
      }
    })
    .then(({ data }) => data.trans_token);

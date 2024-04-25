import axios from "axios";
import { BASE_URL } from "helpers/constants";
import cookies from "js-cookie";

export interface TransactionResponse {
  id: string;
  date: string;
  username: string;
  amount: string;
  balance: string;
}

type GetListOfTransactions = () => Promise<TransactionResponse[]>;

export const getListOfTransactions: GetListOfTransactions = () =>
  axios
    .get<{ trans_token: TransactionResponse[] }>(`${BASE_URL}/api/protected/transactions`, {
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`
      }
    })
    .then(({ data }) => data.trans_token);

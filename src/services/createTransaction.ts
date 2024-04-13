import axios from "axios";
import { BASE_URL } from "helpers/constants";
import cookies from "js-cookie";
import { IUserInfo } from "src/modules/account/store/types";

type CreateTransaction = (name: string, amount: string) => Promise<IUserInfo>;

export const createTransaction: CreateTransaction = (name, amount) =>
  axios
    .get<{ trans_token: IUserInfo }>(`${BASE_URL}/api/protected/transactions`, {
      params: { name, amount },
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`
      }
    })
    .then(({ data }) => data.trans_token);

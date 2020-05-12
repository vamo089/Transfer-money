import { BASE_URL } from "helpers/constants";
import axios from "axios";
import cookies from "js-cookie";

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  balance: number;
}

type GetUserInfo = () => Promise<UserInfo>;

export const getUserInfo: GetUserInfo = () => axios
  .get<{ user_info_token: UserInfo }>(`${BASE_URL}/api/protected/user-info`, {
    headers: {
      Authorization: `Bearer ${cookies.get("token")}`,
    },
  }).then(({data}) => data.user_info_token);
import axios from "axios";
import { BASE_URL } from "helpers/constants";
import cookies from "js-cookie";
import { IUserInfo, TGetUserInfo } from "src/modules/account/store/types";

export const getUserInfo: TGetUserInfo = () =>
  axios
    .get<{ user_info_token: IUserInfo }>(`${BASE_URL}/api/protected/user-info`, {
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`
      }
    })
    .then(({ data }) => data.user_info_token);

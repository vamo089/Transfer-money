import axios from "axios";
import { BASE_URL } from "helpers/constants";
import cookies from "js-cookie";
import { IFilterUserListData, TFilterUserList } from "src/modules/account/store/types";

export const filterUserList: TFilterUserList = (filter) =>
  axios
    .post<IFilterUserListData[]>(
      `${BASE_URL}/api/protected/users/list`,
      { filter },
      {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`
        }
      }
    )
    .then(({ data }) => data);

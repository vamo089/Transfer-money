import axios from 'axios';
import { BASE_URL } from 'helpers/constants';
import cookies from 'js-cookie';

export interface FilterUserListData {
  id: string;
  name: string;
}
export type FilterUserList = (filter: string) => Promise<FilterUserListData[]>;

export const filterUserList: FilterUserList = (filter) =>
  axios
    .post<FilterUserListData[]>(
      `${BASE_URL}/api/protected/users/list`,
      { filter },
      {
        headers: {
          Authorization: `Bearer ${cookies.get('token')}`
        }
      }
    )
    .then(({ data }) => data);

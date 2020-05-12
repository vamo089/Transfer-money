import { BASE_URL } from "helpers/constants";
import axios from "axios";

type FetchLogin = (
  email: string,
  password: string
) => Promise<{
  id_token: string;
}>;

export const loginRequest: FetchLogin = (email, password) =>
  axios
    .post<{
      id_token: string;
    }>(`${BASE_URL}/sessions/create`, {
      email,
      password,
    })
    .then(({ data }) => data);

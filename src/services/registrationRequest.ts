import axios from "axios";
import { BASE_URL } from "helpers/constants";

type FetchRegistration = (
  username: string,
  password: string,
  email: string
) => Promise<{
  id_token: string;
}>;

export const registrationRequest: FetchRegistration = (username, password, email) =>
  axios
    .post<{ id_token: string }>(`${BASE_URL}/users`, {
      username,
      password,
      email
    })
    .then(({ data }) => data);

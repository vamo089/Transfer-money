export interface IAuthState {
  email: string;
  token: string | null;
  isLoading: boolean;
  hasErrors: boolean;
}

export interface ILoginParams {
  email: string;
  password: string;
}

export interface IAuthResponse {
  id_token: string;
}

export interface IRegistrationParams {
  username: string;
  password: string;
  email: string;
}

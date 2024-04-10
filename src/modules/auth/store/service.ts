import { BASE_URL } from 'helpers/constants';
import { BaseHttpClient } from 'src/core/BaseHttpClient';

import { IAuthResponse, ILoginParams, IRegistrationParams } from './types';

export class AuthService extends BaseHttpClient {
  constructor() {
    super(BASE_URL);
  }
  public async login(params: ILoginParams): Promise<IAuthResponse> {
    const response = await this.post<ILoginParams, IAuthResponse>({ url: '/users', body: params });
    return response.data;
  }
  public async registration(params: IRegistrationParams): Promise<IAuthResponse> {
    const response = await this.post<IRegistrationParams, IAuthResponse>({ url: '/sessions/create', body: params });
    return response.data;
  }
}

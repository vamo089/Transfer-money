import axios, { Axios, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from "axios";
import { IHttpClientResponse, TCommonRequestParameters, TJson, TRequestParameters } from "src/core/types";

import { AbstractHttpClient } from "./AbstractHttpClient";

export class BaseHttpClient extends AbstractHttpClient<Axios, AxiosRequestConfig, AxiosResponse> {
  constructor(baseURL: string, options: CreateAxiosDefaults = {}) {
    super(
      axios.create({
        baseURL,
        headers: {
          ["Content-Type"]: "application/json"
        },
        withCredentials: true,
        ...options
      })
    );

    this.postAxiosConfiguration();
  }

  protected postAxiosConfiguration() {}

  public async post<Body extends TJson = TJson, Rs extends TJson = TJson>(
    params?: TRequestParameters<AxiosRequestConfig<any>, Body>
  ): Promise<IHttpClientResponse<Rs, TJson, AxiosResponse<any, any>>> {
    const { url = "", options = {}, body = {} } = params || {};
    const response = await this.vendorClient.post<Rs>(url, body, options);

    return {
      data: response.data,
      headers: response.headers,
      raw: response,
      status: response.status
    };
  }

  public async put<Body extends TJson = TJson, Rs extends TJson = TJson>(
    params?: TRequestParameters<AxiosRequestConfig<any>, Body>
  ): Promise<IHttpClientResponse<Rs, TJson, AxiosResponse<any, any>>> {
    const { url = "", options = {}, body = {} } = params || {};
    const response = await this.vendorClient.put<Rs>(url, body, options);

    return {
      data: response.data,
      headers: response.headers,
      raw: response,
      status: response.status
    };
  }

  public async patch<Body extends TJson = TJson, Rs extends TJson = TJson>(
    params?: TRequestParameters<AxiosRequestConfig<any>, Body>
  ): Promise<IHttpClientResponse<Rs, TJson, AxiosResponse<any, any>>> {
    const { url = "", options = {}, body = {} } = params || {};
    const response = await this.vendorClient.patch<Rs>(url, body, options);

    return {
      data: response.data,
      headers: response.headers,
      raw: response,
      status: response.status
    };
  }

  public async delete<Rs extends TJson = TJson>(
    params?: TRequestParameters<AxiosRequestConfig<any>>
  ): Promise<IHttpClientResponse<Rs, TJson, AxiosResponse<any, any>>> {
    const { url = "", options = {} } = params || {};
    const response = await this.vendorClient.delete(url, options);

    return {
      data: response.data,
      headers: response.headers,
      raw: response,
      status: response.status
    };
  }

  public async deleteWithBody<Body extends TJson = TJson, Rs extends TJson = TJson>(
    params?: TRequestParameters<AxiosRequestConfig<any>, Body>
  ): Promise<IHttpClientResponse<Rs, TJson, AxiosResponse<any, any>>> {
    const { url = "", options = {}, body = {} } = params || {};
    const response = await this.vendorClient.delete<Rs>(url, {
      ...options,
      data: body
    });

    return {
      data: response.data,
      headers: response.headers,
      raw: response,
      status: response.status
    };
  }

  public async head<Rs extends TJson = TJson>(
    params?: TCommonRequestParameters<AxiosRequestConfig<any>>
  ): Promise<IHttpClientResponse<Rs, TJson, AxiosResponse<any, any>>> {
    const { url = "", options = {} } = params || {};
    const response = await this.vendorClient.head<Rs>(url, options);

    return {
      data: response.data,
      headers: response.headers,
      raw: response,
      status: response.status
    };
  }

  public async get<Rs extends TJson = TJson>(
    params?: TCommonRequestParameters<AxiosRequestConfig<any>>
  ): Promise<IHttpClientResponse<Rs, TJson, AxiosResponse<any, any>>> {
    const { url = "", options = {} } = params || {};
    const response = await this.vendorClient.get<Rs>(url, options);

    return {
      data: response.data,
      headers: response.headers,
      raw: response,
      status: response.status
    };
  }
}

import { IHttpClientResponse, TJson, TRequestParameters } from './types';

export abstract class AbstractHttpClient<VendorClient = unknown, RequestOptions = unknown, RawRs = unknown> {
  public readonly vendorClient: VendorClient;

  protected constructor(vendorClient: VendorClient) {
    this.vendorClient = vendorClient;
  }

  public abstract post<Body extends TJson = TJson, Rs extends TJson = TJson>({
    url,
    options,
    body,
  }: TRequestParameters<RequestOptions, Body>): Promise<IHttpClientResponse<Rs, TJson, RawRs>>;

  public abstract put<Body extends TJson = TJson, Rs extends TJson = TJson>({
    url,
    options,
    body,
  }: TRequestParameters<RequestOptions, Body>): Promise<IHttpClientResponse<Rs, TJson, RawRs>>;

  public abstract patch<Body extends TJson = TJson, Rs extends TJson = TJson>({
    url,
    options,
    body,
  }: TRequestParameters<RequestOptions, Body>): Promise<IHttpClientResponse<Rs, TJson, RawRs>>;

  public abstract delete<Rs extends TJson = TJson>({
    url,
    options,
  }: TRequestParameters<RequestOptions>): Promise<IHttpClientResponse<Rs, TJson, RawRs>>;

  public abstract head<Rs extends TJson = TJson>({
    url,
    options,
  }: TRequestParameters<RequestOptions>): Promise<IHttpClientResponse<Rs, TJson, RawRs>>;

  public abstract get<Rs extends TJson = TJson>({
    url,
    options,
  }: TRequestParameters<RequestOptions>): Promise<IHttpClientResponse<Rs, TJson, RawRs>>;
}

export type TJson = Record<string, any>;

export interface IHttpClientResponse<D extends TJson = TJson, H = unknown, R = unknown> {
  data: D;
  status: number;
  headers: H;
  raw: R;
}

export type TCommonRequestParameters<Options = unknown> = {
  url?: string;
  options?: Omit<Options, "body" | "url" | "method">;
};

export type TRequestParameters<
  Options = unknown,
  Body extends TJson | undefined | null = undefined
> = Body extends undefined
  ? TCommonRequestParameters<Options>
  : Body extends null
  ? {
      body?: TJson;
    } & TCommonRequestParameters<Options>
  : {
      body: Body;
    } & TCommonRequestParameters<Options>;

import { EApiMethods } from '@/utils/enums/general.enum';

export interface IMumbleServiceRequestParams {
  method: EApiMethods;
  path: string;
  token: string;
  message: string;
  data?: any;
  headers?: any;
  expectedBack?: 'json' | 'text';
}

export class MumbleService {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getHeaders(method: EApiMethods, token?: string) {
    const headers = new Headers();
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }

    switch (method) {
      case EApiMethods.GET:
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        break;
      case EApiMethods.PUT:
      case EApiMethods.POST:
        headers.append('Content-type', 'multipart/form-data');
        headers.append('Accept ', 'application/json');
        break;
      case EApiMethods.DELETE:
        headers.append('Content-type', 'application/json');
        break;
    }
    return headers;
  }

  async performRequest({
    method,
    path,
    token,
    message,
    data,
    headers,
    expectedBack = 'json',
  }: IMumbleServiceRequestParams) {
    try {
      const options = {
        method,
        headers: headers ? headers : this.getHeaders(method, token),
      };
      if (data) {
        // @ts-ignore
        options.body = data;
      }

      const response = await fetch(`${this.baseUrl}/${path}`, options);
      if (expectedBack === 'json') return await response.json();
      if (expectedBack === 'text') return await response.text();
    } catch (error) {
      console.log(error);
      throw new Error(`Error while ${message}`);
    }
  }
}

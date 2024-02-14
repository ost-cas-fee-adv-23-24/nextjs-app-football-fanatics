import { EApiMethods } from '@/utils/enums/general.enum';

export interface IMumbleServiceRequestParams {
  method: EApiMethods;
  path: string;
  token: string;
  message: string;
  data: any;
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
  }: IMumbleServiceRequestParams) {
    try {
      const response = await fetch(`${this.baseUrl}/${path}`, {
        method,
        headers: this.getHeaders(method, token),
      });
      return await response.json();
    } catch (error) {
      console.log(error);
      throw new Error(`Error fetching ${message}`);
    }
  }
}

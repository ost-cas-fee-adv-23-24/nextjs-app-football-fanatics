import { EApiMethods } from '@/utils/enums/general.enum';

export interface IMumbleServiceRequestParams {
  method: EApiMethods;
  path: string;
  token: string;
  message: string;
  data?: any;
  headers?: any;
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
      console.log(response);
      // TODO check error on serialization of response for avatar upload.
      // upload works but the faling on the return.
      // why it is failing on making the .json()? after uploading the avatar?
      return await response.json();
    } catch (error) {
      console.log(error);
      throw new Error(`Error while ${message}`);
    }
  }
}

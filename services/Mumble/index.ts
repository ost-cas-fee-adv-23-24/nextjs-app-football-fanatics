import { EApiMethods } from '@/utils/enums/general.enum';
import { generateBoundary } from '@/utils/helpers/generateBoundary';

export interface IMumbleServiceRequestParams {
  method: EApiMethods;
  path: string;
  token: string;
  message: string;
  data?: any;
  headers?: any;
  expectedBack?: 'json' | 'text' | 'empty';
  ttl?: number;
  forceNoCache?: boolean;
}

interface IRequestOptions {
  method: EApiMethods;
  headers: any;
  body?: any;
  next?: any;
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
        return headers;
      case EApiMethods.PUT:
      case EApiMethods.PATCH:
        headers.append('Content-type', 'application/json');
        headers.append('Accept', '*/*');
        return headers;
      case EApiMethods.POST:
        headers.append(
          'Content-type',
          `multipart/form-data; boundary=${generateBoundary()}`,
        );
        headers.append('Accept', 'application/json');
        return headers;
      case EApiMethods.DELETE:
        headers.append('Content-type', 'application/json');
        return headers;
    }
  }

  async performRequest({
    method,
    path,
    token,
    message,
    data,
    headers,
    expectedBack = 'json',
    ttl,
    forceNoCache,
  }: IMumbleServiceRequestParams) {
    try {
      const options: IRequestOptions = {
        method,
        headers: headers ? headers : this.getHeaders(method, token),
      };
      if (data) {
        options.body = data;
      }

      if (ttl) {
        options.next = { revalidate: ttl };
      }

      if (forceNoCache) {
        options.next = { cache: 'no-store' };
      }

      // to be able to use the next property in the  mumble response
      const requestUrl = path.includes(this.baseUrl)
        ? path
        : `${this.baseUrl}/${path}`;

      const response = await fetch(`${requestUrl}`, options);

      if (response.status === 401) {
        throw new Error(`Unauthorized, Token was not found or expired`);
        // pretty ugly to check the message here
      } else if (
        response.status === 400 &&
        (message === 'Creating post' || message === 'Uploading avatar')
      ) {
        throw new Error(`Media size exceeded the limit`);
      } else if (response.status === 404) {
        throw new Error(`Resource not found`);
      } else if (response.status === 415) {
        throw new Error(`Not Supported media`);
      }

      if (expectedBack === 'json') return await response.json();
      if (expectedBack === 'text') return await response.text();
      if (expectedBack === 'empty') return response;
    } catch (error) {
      console.log(error);
      throw new Error(`Error while ${message} | ${(error as Error).message}`);
    }
  }
}

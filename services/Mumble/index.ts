import { TPostParams } from '@/services/Post/post.interface';
import envVariables from '@/config/env';
import { EApiMethods } from '@/utils/enums/general.enum';

export interface IMumbleServiceRequestParams {
  method: EApiMethods;
  url: string;
}

class MumbleService {
  baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getHeaders(method: EApiMethods) {
    const headers = new Headers();
    switch (method) {
      case EApiMethods.GET:
        headers.append('Accept', 'application/json');
        break;
      case EApiMethods.PUT:
      case EApiMethods.POST:
        headers.append('Accept ', 'application/json');
        headers.append('Content-type', 'application/json');
        break;
      case EApiMethods.DELETE:
        headers.append('Content-type', 'application/json');
        break;
    }
    return headers;
  }

  async performRequest({ method, url }: IMumbleServiceRequestParams) {
    try {
      const response = await fetch(`${envVariables.MUMBLE_API_URL}/${url}`, {
        method,
        headers: this.getHeaders(method),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Error fetching posts');
    }
  }
}

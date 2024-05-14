import { ClientAuthenticationMethod } from 'oauth4webapi';

export interface IConfig {
  environment: string;
  nextSecret: string;
  nextAuthUrl: string;
  sessionStrategy: 'jwt' | 'database' | undefined;
  sessionMaxAge: number;
  zitadel: {
    clientId: string;
    authority: string;
    scope: string;
    checks: ('pkce' | 'state' | 'none')[];
    tokenEndpointAuthMethod: ClientAuthenticationMethod;
  };
  mumble: {
    host: string;
  };
  avatar: {
    fileNameUploader: string;
  };
  feed: {
    defaultAmount: number;
  };
  trustedDomains: string[];
  cacheRules: {
    allUsersData: number;
    userProfileData: number;
  };
  testing: {
    username: string;
    password: string;
  };
}

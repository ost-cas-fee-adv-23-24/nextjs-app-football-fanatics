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
}

// only use in backend!!!!
const feedAmountItems = 5;

const config = {
  environment: process.env.ENVIRONMENT,
  sessionMaxAge: 36000,
  sessionStrategy: 'jwt',
  mumble: {
    host: process.env.MUMBLE_API_URL,
  },
  nextSecret: process.env.NEXTAUTH_SECRET,
  nextAuthUrl: process.env.NEXTAUTH_URL,
  zitadel: {
    tokenEndpointAuthMethod: 'none',
    checks: ['pkce', 'state'],
    scope:
      'openid profile email urn:zitadel:iam:org:project:id:229389352298352392:aud',
    clientId: process.env.ZITADEL_CLIENT_ID,
    authority:
      process.env.ZITADEL_ISSUER || 'https://cas-fee-adv-ed1ide.zitadel.cloud',
  },
  avatar: {
    fileNameUploader: 'media',
  },
  feed: {
    defaultAmount: feedAmountItems,
  },
  trustedDomains: [
    'http://localhost:3000',
    'https://elbmum.netlify.app',
    'https://www.cusconews.com',
    'https://dev.cusconews.com',
  ],
};

export const frontendConfig = {
  feed: {
    defaultAmount: feedAmountItems,
  },
  notificationDuration: 5000,
};

export default config as IConfig;

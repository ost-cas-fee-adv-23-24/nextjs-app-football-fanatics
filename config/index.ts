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
    getAllUsers: number;
  };
}

// only use in backend!!!!
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
  trustedDomains: [
    'http://localhost:3000',
    'https://elbmum.netlify.app',
    'https://www.cusconews.com',
    'https://dev.cusconews.com',
  ],
  cacheRules: {
    getAllUsers: 1000 * 60 * 60, // 1 hour . On User Created then we would need to clear it
  },
};

export const frontendConfig = {
  feed: {
    fixed: {
      defaultAmount: 50,
    },
    defaultAmount: 10,
    sample: {
      toFetch: 100,
      toPick: 5,
    },
  },
  newPostsRequestInterval: 1000 * 10,
  notificationDuration: 1000 * 5,
  recommendationsAmount: 6,
};

export default config as IConfig;

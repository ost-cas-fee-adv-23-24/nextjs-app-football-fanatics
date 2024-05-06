import { IConfig } from '@/config/utils/interface/config.interface';

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
    allUsersData: 1000 * 60 * 60, // 1 hour . On User Created then we would need to clear it
    userProfileData: 1000 * 60 * 60 * 2, // 2 hours
  },
  testing: {
    username: process.env.TEST_USER_NAME || '',
    password: process.env.TEST_USER_PASSWORD || '',
  },
};

export default config as IConfig;

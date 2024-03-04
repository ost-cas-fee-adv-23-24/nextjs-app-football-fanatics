export interface IConfig {
  environment: string;
  zitadel: {
    clientSecret: string;
    clientId: string;
    authority: string;
    codeVerifier: string;
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
}

const config = {
  environment: process.env.ENVIRONMENT,
  mumble: {
    host: process.env.MUMBLE_API_URL,
  },
  zitadel: {
    clientSecret: process.env.ZITADEL_CLIENT_SECRET,
    clientId: process.env.ZITADEL_CLIENT_ID,
    authority:
      process.env.ZITADEL_ISSUER || 'https://cas-fee-adv-ed1ide.zitadel.cloud',
    codeVerifier: 'this-is-very-secret',
  },
  avatar: {
    fileNameUploader: 'media',
  },
  feed: {
    defaultAmount: 30,
  },
};

export default config as IConfig;

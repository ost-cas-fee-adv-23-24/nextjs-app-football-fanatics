export interface IConfig {
  environment: string;
  zitadel: {
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
    clientId: process.env.ZITADEL_CLIENT_ID,
    authority: 'https://cas-fee-adv-ed1ide.zitadel.cloud',
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

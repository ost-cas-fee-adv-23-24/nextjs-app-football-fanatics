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

// only use in backend!!!!

const config = {
  environment: process.env.ENVIRONMENT,
  mumble: {
    host: process.env.MUMBLE_API_URL,
  },
  zitadel: {
    clientId: process.env.ZITADEL_CLIENT_ID,
    authority:
      process.env.ZITADEL_ISSUER || 'https://cas-fee-adv-ed1ide.zitadel.cloud',
    codeVerifier: 'this-is-very-secret',
  },
  avatar: {
    fileNameUploader: 'media',
  },
  feed: {
    defaultAmount: 5,
  },
};

export const frontendConfig = {
  feed: {
    defaultAmount: 5,
  },
  maxWidth: '680px',
};

export default config as IConfig;

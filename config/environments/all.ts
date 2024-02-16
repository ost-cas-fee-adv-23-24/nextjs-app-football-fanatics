export interface IConfig {
  zitadel: {
    clientId: string;
    authority: string;
    codeVerifier: string;
  };
  mumble: {
    host: string;
  };
  feed: {
    defaultAmount: number;
  };
}

const config = {
  mumble: {
    host: 'https://mumble-api-prod-4cxdci3drq-oa.a.run.app',
  },
  zitadel: {
    clientId: process.env.ZITADEL_CLIENT_ID,
    authority: 'https://cas-fee-adv-ed1ide.zitadel.cloud',
    codeVerifier: 'this-is-very-secret',
  },
  feed: {
    defaultAmount: 20,
  },
};

export default config as IConfig;

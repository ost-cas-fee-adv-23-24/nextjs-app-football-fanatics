import NextAuth, { User } from 'next-auth';
import Zitadel from 'next-auth/providers/zitadel';
import config from '@/config';
const trustHost =
  config.environment === 'development' // netlify should be dev
    ? true
    : config.trustedDomains.includes(config.nextAuthUrl);

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  session: {
    strategy: config.sessionStrategy,
    maxAge: config.sessionMaxAge,
  },
  secret: config.nextSecret,
  trustHost,
  providers: [
    Zitadel({
      clientId: config.zitadel.clientId,
      issuer: config.zitadel.authority,
      authorization: {
        params: {
          scope: config.zitadel.scope,
        },
      },
      checks: config.zitadel.checks,
      client: {
        token_endpoint_auth_method: config.zitadel.tokenEndpointAuthMethod,
      },
    }),
  ],

  callbacks: {
    jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.expiresAt = (account.expires_at ?? 0) * 1000;
      }
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({ session, token, user }) {
      // exposes token and user identifier in session
      // type Session and user extended in auth.d.ts (project root)
      session.accessToken = token.accessToken as string;
      session.user.identifier = (token.user as User).id;
      return session;
    },
  },
});

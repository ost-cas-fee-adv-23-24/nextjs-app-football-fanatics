import NextAuth, { User } from 'next-auth';
import Zitadel from 'next-auth/providers/zitadel';
import config from '@/config';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    Zitadel({
      clientSecret: config.zitadel.clientSecret,
      clientId: config.zitadel.clientId,
      issuer: config.zitadel.authority,
      authorization: {
        params: {
          scope:
            'openid profile email urn:zitadel:iam:org:project:id:229389352298352392:aud',
        },
      },
      checks: ['pkce', 'state'],
      client: {
        token_endpoint_auth_method: 'none',
      },
    }),
  ],
  trustHost: config.environment === 'local',
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
  secret: 'this-is-very-secret',
});

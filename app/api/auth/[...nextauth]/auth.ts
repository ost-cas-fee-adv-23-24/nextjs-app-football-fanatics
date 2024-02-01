import NextAuth from 'next-auth';
import Zitadel from 'next-auth/providers/zitadel';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    Zitadel({
      clientId: process.env.ZITADEL_CLIENT_ID,
      issuer: 'https://cas-fee-adv-ed1ide.zitadel.cloud',
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
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.expiresAt = (account.expires_at ?? 0) * 1000;
      }
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  secret: 'this-is-very-secret',
});

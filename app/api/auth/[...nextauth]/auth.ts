import NextAuth from 'next-auth';
import Zitadel from 'next-auth/providers/zitadel';
import { MumbleUserService } from '@/services/Mumble/MumbleUser';
import config from '@/config';

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
      // @ts-ignore
      session.accessToken = token.accessToken;
      // @ts-ignore
      session.user.identifier = token.user.id;
      // // @ts-ignore
      // session.user.image = await getAvatar(token.accessToken, token.user.id);

      return session;
    },
  },
  secret: 'this-is-very-secret',
});

// const getAvatar = async (token: string, identifier: string) => {
//   if (!token) {
//     return null;
//   }
//   try {
//     const dataSource = new MumbleUserService(config.mumble.host);
//     const responseService = await dataSource.getUserByIdentifier({
//       token,
//       identifier,
//     });
//     return responseService.avatarUrl;
//   } catch (error) {
//     console.log('Error fetching user');
//     return null;
//   }
// };

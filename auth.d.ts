import 'next-auth';
import { User } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    user: User;
  }
  interface User {
    identifier: string;
  }
}

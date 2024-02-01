'use client';

import { signIn } from 'next-auth/react';

export default function LoginButton() {
  return (
    <button
      onClick={() => signIn('zitadel')}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Login with Zitadel
    </button>
  );
}

import { NextRequest } from 'next/server';

export const GET = async (
  request: NextRequest,
  context: any,
): Promise<Response> => {
  const identifier = context.params.identifier;
  return new Response(`Hello ${identifier}`);
};

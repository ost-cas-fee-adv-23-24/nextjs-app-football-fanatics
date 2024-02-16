import { NextApiRequest, NextPageContext } from 'next';

export const GET = async (
  request: NextApiRequest,
  context: any,
): Promise<Response> => {
  const identifier = context.params.identifier;
  return new Response(`Hello ${identifier}`);
};

import { NextApiRequest } from 'next';

export const GET = async (request: NextApiRequest): Promise<Response> => {
  return new Response('test');
};
export const PATCH = async (request: NextApiRequest): Promise<Response> => {
  return new Response('test');
};

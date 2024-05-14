import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest): Promise<Response> => {
  return new Response('test');
};
export const PATCH = async (request: NextRequest): Promise<Response> => {
  return new Response('test');
};

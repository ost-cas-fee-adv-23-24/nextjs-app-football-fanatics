import * as dotenv from 'dotenv';
dotenv.config();

import z from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.string().default('3000'),
  ZITADEL_CLIENT_ID: z.string(),
  MUMBLE_API_URL: z.string(),
});

const envVariables = envSchema.parse(process.env);

export default envVariables;
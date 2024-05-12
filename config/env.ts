import z from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test', 'local'])
    .default('development'),
  PORT: z.string().default('3000'),
  ZITADEL_CLIENT_ID: z.string(),
  ZITADEL_ISSUER: z.string(),
  NEXTAUTH_URL: z.string(),
  NEXTAUTH_SECRET: z.string(),
  MUMBLE_API_URL: z.string(),
  ENVIRONMENT: z.string(),
  TEST_USER_NAME: z.string(),
  TEST_USER_PASSWORD: z.string(),
});

const envVariables = envSchema.parse(process.env);

export default envVariables;

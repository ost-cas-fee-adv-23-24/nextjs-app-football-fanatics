# Mumble by The FF (Football Fanatics) Team

This project is a collaborative effort between:

- Bladimir Ardiles Cruz [`bladicito`](https://github.com/bladicito)
- Patrick Lehmann [`Paeddy`](https://github.com/lehmi11)

undertaken as part of our final team project for the [`Certificate of Advanced Studies in Advanced Frontend Engineering`](https://www.ost.ch/de/weiterbildung/weiterbildungsangebot/informatik/software-engineering-testing/cas-frontend-engineering-advanced) at the [`University of Applied Sciences of Eastern Switzerland (OST)`](https://www.ost.ch/en).
***
## Core
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

#### More about NextJs
[Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
***
## Pre Requisites 
You need to have a .env.local file in the root of the project with the following variables:

| Variable           |                                                               value                                                               |
|:-------------------|:---------------------------------------------------------------------------------------------------------------------------------:|
| ZITADEL_CLIENT_ID  |                                        Secret. ask for the value to one of the maintainers                                        |
| ZITADEL_ISSUER     |                                             https://cas-fee-adv-ed1ide.zitadel.cloud                                              |
| MUMBLE_API_URL     |                                  https://mumble-api-prod-4cxdci3drq-oa.a.run.app                                                  |
| ENVIRONMENT        |                                                 local - development - production                                                  |
| NEXTAUTH_SECRET    |                                        Secret. ask for the value to one of the maintainers                                        |
| NEXTAUTH_URL       |                             http://localhost:3000 - https://cusconews.com - https://dev.cusconews.com                             |
| TEST_USER_NAME     |                                        Secret. ask for the value to one of the maintainers                                        |
| TEST_USER_PASSWORD |                                        Secret. ask for the value to one of the maintainers                                        |

In case a new environment is needed (exp. staging), please add the domain of the same to the `allowed domains` in the zitadel configuration (config/index.ts).

## Authentication
This project uses Zitadel. 
Make sure that you have an Organization in Zitadel and that you have the client id and the issuer url.
The return URL must be configured in the Zitadel configuration.
As an example, the return URL for the dev environment our configuration includes the following url:
- `https://main.dpejyjo5wbo0b.amplifyapp.com/api/auth/callback/zitadel`
- `https://dev.cusconews.com/api/auth/callback/zitadel`
- `http://localhost:3000`

The Zitadel configuration is located in the `app/api/auth/[...nextauth]/auth.ts` file.

***
## Development
First, run the development server:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build
```bash
npm run build
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Linting, Formatting, Type checking
Run linter:
```bash
npm run lint
```
Check prettier format: 
```bash
npm run format:check
```
Fix prettier format:
```bash
npm run format:fix
```
Run type checking:
```bash
npm run type-check
```

Run linter, prettier and type checking:
```bash
npm run code:fix
```

***
## Testing
Run all playwright tests
```bash
npm run test
```
Open playwright's ui mode to run the tests there:
```bash
npm run test:ui
```

***
## Deployments/Rollouts
Our Project uses AWS Amplify for deployment.
This allows us to deploy the whole application based on commits to main and production branches.

### Amplify configuration
The Amplify configuration is located in the `amplify.yml` file.
Make sure that you include all environment variables in the amplify console and also in the `amplify.yml` file.
Amplify does not add the environment variables automatically to the build process. you need to do it manually (see `amplify.yml`).

```bash
env | grep -e NEXTAUTH_URL -e NEXTAUTH_SECRET -e ZITADEL_CLIENT_ID -e ZITADEL_ISSUER -e MUMBLE_API_URL -e ENVIRONMENT  >> .env
```

### Dev Deployment
The dev deployment is triggered by a commit to the **main branch**. Directs commits or pull requests merged into the main branch will trigger a deployment to the dev environment.

### Production Deployment
The production deployment is triggered by a commit to the **production branch**. 
The strategy is to merge the main branch into the production branch accordingly. 



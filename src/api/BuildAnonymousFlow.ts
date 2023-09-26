import fetch from 'node-fetch';
import {
  AnonymousAuthMiddlewareOptions,
  ClientBuilder,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

const projectKey = process.env.REACT_APP_CTP_PROJECT_KEY || '';

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: process.env.REACT_APP_CTP_API_URL || '',
  fetch,
};

const options: AnonymousAuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: projectKey,
  credentials: {
    clientId: process.env.REACT_APP_CTP_CLIENT_ID || '',
    clientSecret: process.env.REACT_APP_CTP_CLIENT_SECRET || '',
  },
  scopes: [`manage_project:${projectKey}`],
  fetch,
};

export const anonymousClient = new ClientBuilder()
  .withAnonymousSessionFlow(options)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

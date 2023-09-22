import fetch from 'node-fetch';
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

const projectKey = process.env.REACT_APP_CTP_PROJECT_KEY || '';

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: process.env.REACT_APP_CTP_AUTH_URL || '',
  projectKey: projectKey,
  credentials: {
    clientId: process.env.REACT_APP_CTP_CLIENT_ID || '',
    clientSecret: process.env.REACT_APP_CTP_CLIENT_SECRET || '',
  },
  scopes: [`manage_project:${projectKey}`],
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: process.env.REACT_APP_CTP_API_URL || '',
  fetch,
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  // .withLoggerMiddleware() // @note используем чтобы выводить в консоль запросы отправляемые commercetools/sdk
  .build();

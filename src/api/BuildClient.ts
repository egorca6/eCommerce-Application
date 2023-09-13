import fetch from 'node-fetch';
import {
  AnonymousAuthMiddlewareOptions,
  ClientBuilder,
  PasswordAuthMiddlewareOptions,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { count } from '../constants/registratForm';

const projectKey = process.env.REACT_APP_CTP_PROJECT_KEY || '';

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: process.env.REACT_APP_CTP_AUTH_URL || '',
  projectKey: projectKey,
  credentials: {
    clientId: process.env.REACT_APP_CTP_CLIENT_ID || '',
    clientSecret: process.env.REACT_APP_CTP_CLIENT_SECRET || '',
  },
  scopes: [`${process.env.REACT_APP_CTP_SCOPES}`],
  fetch,
};

const authMiddlewareOptionsAnonym: AnonymousAuthMiddlewareOptions = {
  host: process.env.REACT_APP_CTP_AUTH_URL || '',
  projectKey: projectKey,
  credentials: {
    clientId: process.env.REACT_APP_CTP_CLIENT_ID || '',
    clientSecret: process.env.REACT_APP_CTP_CLIENT_SECRET || '',
  },
  scopes: [`${process.env.REACT_APP_CTP_SCOPES}`],
  fetch,
};

const authMiddlewareOptionsCustom: PasswordAuthMiddlewareOptions = {
  host: process.env.REACT_APP_CTP_AUTH_URL || '',
  projectKey: projectKey,
  credentials: {
    clientId: process.env.REACT_APP_CTP_CLIENT_ID || '',
    clientSecret: process.env.REACT_APP_CTP_CLIENT_SECRET || '',
    user: {
      username: count.email,
      password: count.password,
    },
  },
  scopes: [`${process.env.REACT_APP_CTP_SCOPES}`],
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: process.env.REACT_APP_CTP_API_URL || '',
  fetch,
};

export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

export const ctpClientAnonym = new ClientBuilder()
  .withAnonymousSessionFlow(authMiddlewareOptionsAnonym)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

export const ctpClientCustom = new ClientBuilder()
  .withPasswordFlow(authMiddlewareOptionsCustom)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

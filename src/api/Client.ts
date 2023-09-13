import { ctpClientAnonym, ctpClient, ctpClientCustom } from './BuildClient';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const projectKey = process.env.REACT_APP_CTP_PROJECT_KEY || '';

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: projectKey,
});

export const apiRootAnonymous = createApiBuilderFromCtpClient(
  ctpClientAnonym,
).withProjectKey({
  projectKey: projectKey,
});

export const apiRootCustom = createApiBuilderFromCtpClient(
  ctpClientCustom,
).withProjectKey({
  projectKey: projectKey,
});

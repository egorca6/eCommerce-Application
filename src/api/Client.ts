import { ctpClient } from './BuildClient';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { customClient } from './BuildPasswordFlow';
import { anonymousClient } from './BuildAnonymousFlow';

// Create apiRoot from the imported ClientBuilder and include your Project key
export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: process.env.REACT_APP_CTP_PROJECT_KEY || '',
});

export const apiRootCustom = createApiBuilderFromCtpClient(
  customClient,
).withProjectKey({
  projectKey: process.env.REACT_APP_MANAGE_CTP_PROJECT_KEY || '',
});

export const apiRootAnonymous = createApiBuilderFromCtpClient(
  anonymousClient,
).withProjectKey({
  projectKey: process.env.REACT_APP_MANAGE_CTP_PROJECT_KEY || '',
});

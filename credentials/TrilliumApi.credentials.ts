import type {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class TrilliumApi implements ICredentialType {
  name = 'trilliumApi';
  displayName = 'Trillium API';
  documentationUrl = 'https://docs.triliumnotes.org/user-guide/advanced-usage/etapi.html';

  properties: INodeProperties[] = [
    {
      displayName: 'Base URL',
      name: 'baseUrl',
      type: 'string',
      default: '',
      required: true,
      placeholder: 'https://your-trillium-instance.com',
      description: 'The base URL of your Trillium instance (without /etapi)',
    },
    {
      displayName: 'Token',
      name: 'token',
      type: 'string',
      typeOptions: { password: true },
      default: '',
      required: true,
      description: 'ETAPI token from Trillium Options > ETAPI',
    },
  ];

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        Authorization: '={{$credentials.token}}',
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{$credentials.baseUrl}}/etapi',
      url: '/app-info',
    },
  };
}
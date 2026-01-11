import { TrilliumApi } from 'credentials/TrilliumApi.credentials';

describe('TrilliumApi Credential', () => {
  let credential: TrilliumApi;

  beforeEach(() => {
    credential = new TrilliumApi();
  });

  it('should be defined', () => {
    expect(credential).toBeDefined();
    expect(credential.name).toBe('trilliumApi');
    expect(credential.displayName).toBe('Trillium API');
    expect(credential.documentationUrl).toBe('https://docs.triliumnotes.org/user-guide/advanced-usage/etapi.html');
  });

  it('should have correct properties', () => {
    expect(credential.properties).toHaveLength(2);
    const baseUrlProp = credential.properties.find(p => p.name === 'baseUrl');
    expect(baseUrlProp).toBeDefined();
    expect(baseUrlProp!.required).toBe(true);
    expect(baseUrlProp!.placeholder).toBe('https://your-trillium-instance.com');
    expect(baseUrlProp!.description).toContain('without /etapi');

    const tokenProp = credential.properties.find(p => p.name === 'token');
    expect(tokenProp).toBeDefined();
    expect(tokenProp!.typeOptions!.password).toBe(true);
    expect(tokenProp!.required).toBe(true);
  });

  it('should have correct authenticate configuration', () => {
    expect(credential.authenticate.type).toBe('generic');
    expect((credential.authenticate.properties as any).headers.Authorization).toBe('={{$credentials.token}}');
  });

  it('should have correct test request', () => {
    expect(credential.test.request.url).toBe('/app-info');
    expect(credential.test.request.baseURL).toBe('={{$credentials.baseUrl}}/etapi');
  });
});
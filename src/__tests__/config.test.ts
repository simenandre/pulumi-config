const defaultConfig: Record<string, string> = {
  'stack-name': 'dev',
  'work-dir': './',
  key: 'hello.there',
  value: 'hello',
  secret: 'true',
  'cloud-url': 'file://~',
  'github-token': 'n/a',
  'pulumi-version': 'latest',
};

describe('config.ts', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  it('should validate a configuration', async () => {
    const config = {
      ...defaultConfig,
      'comment-on-pr': 'false',
    };
    jest.mock('@actions/core', () => ({
      getInput: jest.fn((name: string) => {
        return config[name];
      }),
      getBooleanInput: jest.fn((name: string) => {
        return Boolean(config[name]);
      }),
    }));

    const { config: c } = require('../config');

    expect(c).toBeTruthy();
    expect(c).toMatchInlineSnapshot(`
      {
        "cloudUrl": "file://~",
        "key": "hello.there",
        "secret": true,
        "stackName": "dev",
        "value": "hello",
        "workDir": "./",
      }
    `);
  });
  it.todo('should fail if configuration are invalid');
  it('should validate a configuration with commentOnPr eq true', async () => {
    const config = {
      ...defaultConfig,
      'comment-on-pr': 'true',
    };
    jest.mock('@actions/core', () => ({
      getInput: jest.fn((name: string) => {
        return config[name];
      }),
      getBooleanInput: jest.fn((name: string) => {
        return Boolean(config[name]);
      }),
    }));

    const { config: c } = require('../config');
    expect(c).toBeTruthy();
    expect(c).toMatchInlineSnapshot(`
      {
        "cloudUrl": "file://~",
        "key": "hello.there",
        "secret": true,
        "stackName": "dev",
        "value": "hello",
        "workDir": "./",
      }
    `);
  });
});

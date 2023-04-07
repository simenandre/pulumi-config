import { MockAgent, setGlobalDispatcher } from 'undici';
import { versions } from '../__fixtures__/versions';
import { getVersionObject } from '../libs/get-version';

const agent = new MockAgent();
agent.disableNetConnect();

setGlobalDispatcher(agent);

describe('get-version', () => {
  process.env.GITHUB_TOKEN = process.env.GITHUB_TOKEN || 'my-token';
  describe('range versions', () => {
    it.each([
      'latest',
      '^3',
      '3.*.*',
      '3.0.*',
      'v1.*.*',
      'v2.22.*',
      '2.17.1',
      'v2.17.2',
      '2.5.0',
    ] as const)('should match %s versions', async (ver) => {
      agent
        .get('https://raw.githubusercontent.com')
        .intercept({
          path: '/pulumi/docs/master/data/versions.json',
          method: 'GET',
        })
        .reply(200, versions);
      const v = await getVersionObject(ver);
      expect(v.version).toMatchSnapshot();
    });
  });
});

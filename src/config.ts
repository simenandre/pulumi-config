import * as parsers from 'actions-parsers';

export const config = {
  stackName: parsers.getInput('stack-name', { required: true }),
  workDir: parsers.getInput('work-dir', { required: true }),

  key: parsers.getInput('key', { required: true }),
  value: parsers.getInput('value'),

  secret: parsers.getBooleanInput('secret'),
  cloudUrl: parsers.getInput('cloud-url'),
};

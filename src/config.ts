import { getBooleanInput, getInput } from '@actions/core';
import * as rt from 'runtypes';

export const config = rt.Record({
  // Required inputs
  stackName: rt.String,
  workDir: rt.String,

  // Optional inputs
  key: rt.String.optional(),
  value: rt.String.optional(),
  secret: rt.Boolean.optional(),
  cloudUrl: rt.String.optional(),
});

export type Config = rt.Static<typeof config>;

export async function makeConfig(): Promise<Config> {
  return config.check({
    // Required inputs
    stackName: getInput('stack-name', { required: true }),
    workDir: getInput('work-dir', { required: true }),
    key: getInput('key', { required: true }),

    // Optional inputs
    value: getInput('value'),
    secret: getBooleanInput('secret'),
    cloudUrl: getInput('cloud-url'),
  });
}

import { resolve } from 'path';
import * as core from '@actions/core';
import { LocalProgramArgs, LocalWorkspace } from '@pulumi/pulumi/automation';
import { config } from './config';
import { environmentVariables } from './libs/envs';
import * as pulumiCli from './libs/pulumi-cli';

const pulumiVersion = '^3';

const main = async () => {
  core.debug('Configuration is loaded');

  await pulumiCli.downloadCli(pulumiVersion);

  if (environmentVariables.PULUMI_ACCESS_TOKEN !== '') {
    core.debug(`Logging into to Pulumi`);
    await pulumiCli.run('login');
  } else if (config.cloudUrl) {
    core.debug(`Logging into to ${config.cloudUrl}`);
    await pulumiCli.run('login', config.cloudUrl);
  }

  const workDir = resolve(
    environmentVariables.GITHUB_WORKSPACE,
    config.workDir,
  );
  core.debug(`Working directory resolved at ${workDir}`);

  const stackArgs: LocalProgramArgs = {
    stackName: config.stackName,
    workDir: workDir,
  };

  const stack = await LocalWorkspace.selectStack(stackArgs);
  if (config.secret) {
    core.setSecret(config.value);
  }

  const stackConfig = await stack.getAllConfig();

  core.setOutput('config', stackConfig);
  if (config.key && config.key in stackConfig) {
    core.setOutput('key', stackConfig[config.key]);
  }

  if (config.value) {
    if (!config.key) {
      throw new Error(
        'Missing `key` input.' +
          'You need to set both value and key to set config values.',
      );
    }
    core.info(`Setting ${config.key} to ${config.secret}`);
    await stack.setConfig(config.key, {
      value: config.value,
      secret: config.secret,
    });
  }
};

(async () => {
  try {
    await main();
  } catch (err) {
    if (err.message.stderr) {
      core.setFailed(err.message.stderr);
    } else {
      core.setFailed(err.message);
    }
  }
})();

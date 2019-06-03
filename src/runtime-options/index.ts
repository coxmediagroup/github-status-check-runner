import { PreValidatedArgs, NormalizedArgs, NormalizedArgsKeys } from 'types';

import cliArgs from './cli-args';
import envVars from './env-vars';

export const topArgKeys: NormalizedArgsKeys[] = ['git', 'github', 'runCheck', 'other'];

export const githubKeys = ['owner', 'repository', 'token'];

export const gitKeys = ['sha'];

export const baseArgs = (): NormalizedArgs => {
  const args = {
    git: {
      sha: '',
    },
    github: {
      owner: '',
      repository: '',
      token: '',
    },
    runCheck: {
      command: '',
      context: '',
    },
    other: {
      dryrun: false,
    },
  };
  return args;
};

const argsReducer = (acc: PreValidatedArgs, cur: PreValidatedArgs) => {
  topArgKeys.map((key) => {
    acc[key] = { ...acc[key], ...(cur as NormalizedArgs)[key] };
  });
  return acc;
};

const coalesceArgs = (...argsArray: PreValidatedArgs[]): PreValidatedArgs => {
  return argsArray.reduce(argsReducer, {} as PreValidatedArgs);
};

// TODO: Merge config vars
const argsCoalesced = coalesceArgs(baseArgs(), envVars(), cliArgs());

const runtimeOptions = argsCoalesced as NormalizedArgs;

export default runtimeOptions;

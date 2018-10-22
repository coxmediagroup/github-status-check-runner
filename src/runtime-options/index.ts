import { ghsc } from 'types';

import cliArgs from './cli-args';
import envVars from './env-vars';

export const topArgKeys: ghsc.NormalizedArgsKeys[] = [
  'git',
  'github',
  'statusChecks',
  'other',
];
export const githubKeys = ['owner', 'repository', 'token'];
export const gitKeys = ['sha'];

export const baseArgs = (): ghsc.NormalizedArgs => {
  const args = {
    git: {
      sha: '',
    },
    github: {
      owner: '',
      repository: '',
      token: '',
    },
    statusChecks: {},
    other: {
      dryrun: false,
    },
  };
  return args;
};

const argsReducer = (
  acc: ghsc.PreValidatedArgs,
  cur: ghsc.PreValidatedArgs,
) => {
  topArgKeys.map((key) => {
    acc[key] = { ...acc[key], ...(cur as ghsc.NormalizedArgs)[key] };
  });
  return acc;
};

const coalesceArgs = (
  ...argsArray: ghsc.PreValidatedArgs[]
): ghsc.PreValidatedArgs => {
  return argsArray.reduce(argsReducer, {} as ghsc.PreValidatedArgs);
};

// TODO: Merge config vars
const argsCoalesced = coalesceArgs(baseArgs(), envVars(), cliArgs());

const runtimeOptions = argsCoalesced as ghsc.NormalizedArgs;

export default runtimeOptions;

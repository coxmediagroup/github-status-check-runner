import { PreValidatedArgs } from '../types';

import yargs from 'yargs';

import { trimArgs } from '../utils';
import { getDefaultCommitHash } from '../git-cli';
import { baseArgs } from '.';

export const yargArgs = yargs
  .usage('$0 [GitHub Params] [Git Params] -- npm run lint')
  .group(['owner', 'repository', 'token'], 'GitHub Params')
  .group('sha', 'Git Params')
  .option('o', {
    alias: 'owner',
    description: 'Repository owner',
    nargs: 1,
  })
  .option('r', {
    alias: ['repository'],
    description: 'Repository name',
    nargs: 1,
  })
  .option('t', {
    alias: 'token',
    description: 'Personal access token',
    nargs: 1,
  })
  .option('s', {
    alias: ['sha', 'commit', 'hash', 'branch', 'tag'],
    description: 'Commit SHA-1, branch, or tag',
    default: getDefaultCommitHash(),
    nargs: 1,
  })
  .option('d', {
    alias: 'dryrun',
    description: 'Run commands but do not create any GitHub status checks',
    boolean: true,
  })
  .option('c', {
    alias: 'context',
    description: 'Label of the status check to be displayed in GitHub',
    nargs: 1,
  })
  .example(
    '$0 --owner foo --repository bar --token abc123 -- npm run lint',
    'Create a new status check "test:js" at the GitHub repository "foo/bar" ' +
      'based on the results of the command executed.',
  )
  .wrap(yargs.terminalWidth()).argv;

const args = (): PreValidatedArgs => {
  const newArgs = baseArgs();

  // Git
  newArgs.git.sha = yargArgs.sha;

  // GitHub
  newArgs.github.owner = yargArgs.owner;
  newArgs.github.repository = yargArgs.repository;
  newArgs.github.token = yargArgs.token;

  // Status Checks
  newArgs.runCheck.command = yargArgs._.join(' ');
  newArgs.runCheck.context = yargArgs.context;

  // Other
  newArgs.other.dryrun = yargArgs.dryrun;

  // Remove properties with empty values
  trimArgs(newArgs);

  return newArgs;
};

export default args;

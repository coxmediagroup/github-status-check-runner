import { ghsc } from '../types';

import yargs from 'yargs';

import { parseContextCommands, trimArgs } from '../utils';
import { getDefaultCommitHash } from '../git-cli';
import { baseArgs } from '.';

export const yargArgs = yargs
  .usage('$0 [GitHub Params] [Git Params] -- "test:js" "gulp test:js"')
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
  .example(
    '$0 --owner foo --repository bar --token abc123 -- "test:js" "gulp test:js"',
    'Create a new status check "test:js" at the GitHub repository "foo/bar" based on the ' +
      'results of the command executed.',
  )
  .wrap(yargs.terminalWidth()).argv;

const args = (): ghsc.PreValidatedArgs => {
  const newArgs = baseArgs();

  // Git
  newArgs.git.sha = yargArgs.sha;

  // GitHub
  newArgs.github.owner = yargArgs.owner;
  newArgs.github.repository = yargArgs.repository;
  newArgs.github.token = yargArgs.token;

  // Statuc Checks
  newArgs.statusChecks = parseContextCommands(yargArgs._);

  // Other
  newArgs.other.dryrun = yargArgs.dryrun;

  // Remove properties with empty values
  trimArgs(newArgs);

  return newArgs;
};

export default args;

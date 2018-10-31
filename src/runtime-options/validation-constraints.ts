import runtimeOptions from '../runtime-options';

const nonEmptyString = /.+/;

const gitConstraints = {
  git: {
    presence: true,
  },
  'git.sha': {
    presence: true,
    format: {
      pattern: nonEmptyString,
      message: 'must contain a git SHA, branch name, or a tag name',
    },
  },
};

const githubConstraints = {
  github: {
    presence: !runtimeOptions.other.dryrun,
  },
  'github.owner': {
    presence: !runtimeOptions.other.dryrun,
    format: {
      pattern: nonEmptyString,
      message: 'must contain a GitHub owner name',
    },
  },
  'github.repository': {
    presence: !runtimeOptions.other.dryrun,
    format: {
      pattern: nonEmptyString,
      message: 'must contain a GitHub respository name',
    },
  },
  'github.token': {
    presence: !runtimeOptions.other.dryrun,
    format: {
      pattern: nonEmptyString,
      message: 'must contain a GitHub user token',
    },
  },
};

const runCheckConstraints = {
  runCheck: {
    presence: true,
  },
  'runCheck.command': {
    presence: true,
  },
  'runCheck.context': {
    presence: true,
  },
};

const otherConstraints = {
  other: {
    presence: true,
  },
  'other.dryrun': {
    presence: true,
  },
};

export const runtimeOptionsConstraints = {
  ...gitConstraints,
  ...githubConstraints,
  ...runCheckConstraints,
  ...otherConstraints,
};

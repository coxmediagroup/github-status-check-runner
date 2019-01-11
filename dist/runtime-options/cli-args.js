"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const utils_1 = require("../utils");
const git_cli_1 = require("../git-cli");
const _1 = require(".");
exports.yargArgs = yargs_1.default
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
    default: git_cli_1.getDefaultCommitHash(),
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
    .example('$0 --owner foo --repository bar --token abc123 -- npm run lint', 'Create a new status check "test:js" at the GitHub repository "foo/bar" ' +
    'based on the results of the command executed.')
    .wrap(yargs_1.default.terminalWidth()).argv;
const args = () => {
    const newArgs = _1.baseArgs();
    newArgs.git.sha = exports.yargArgs.sha;
    newArgs.github.owner = exports.yargArgs.owner;
    newArgs.github.repository = exports.yargArgs.repository;
    newArgs.github.token = exports.yargArgs.token;
    newArgs.runCheck.command = exports.yargArgs._.join(' ');
    newArgs.runCheck.context = exports.yargArgs.context;
    newArgs.other.dryrun = exports.yargArgs.dryrun;
    utils_1.trimArgs(newArgs);
    return newArgs;
};
exports.default = args;

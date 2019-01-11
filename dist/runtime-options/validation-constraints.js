"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runtime_options_1 = __importDefault(require("../runtime-options"));
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
        presence: !runtime_options_1.default.other.dryrun,
    },
    'github.owner': {
        presence: !runtime_options_1.default.other.dryrun,
        format: {
            pattern: nonEmptyString,
            message: 'must contain a GitHub owner name',
        },
    },
    'github.repository': {
        presence: !runtime_options_1.default.other.dryrun,
        format: {
            pattern: nonEmptyString,
            message: 'must contain a GitHub respository name',
        },
    },
    'github.token': {
        presence: !runtime_options_1.default.other.dryrun,
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
exports.runtimeOptionsConstraints = Object.assign({}, gitConstraints, githubConstraints, runCheckConstraints, otherConstraints);

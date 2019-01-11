"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_args_1 = __importDefault(require("./cli-args"));
const env_vars_1 = __importDefault(require("./env-vars"));
exports.topArgKeys = ['git', 'github', 'runCheck', 'other'];
exports.githubKeys = ['owner', 'repository', 'token'];
exports.gitKeys = ['sha'];
exports.baseArgs = () => {
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
const argsReducer = (acc, cur) => {
    exports.topArgKeys.map((key) => {
        acc[key] = Object.assign({}, acc[key], cur[key]);
    });
    return acc;
};
const coalesceArgs = (...argsArray) => {
    return argsArray.reduce(argsReducer, {});
};
const argsCoalesced = coalesceArgs(exports.baseArgs(), env_vars_1.default(), cli_args_1.default());
const runtimeOptions = argsCoalesced;
exports.default = runtimeOptions;

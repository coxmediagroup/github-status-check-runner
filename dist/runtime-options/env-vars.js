"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const utils_1 = require("../utils");
const githubOwner = process.env.GITHUB_OWNER || '';
const githubRepo = process.env.GITHUB_REPO || '';
const githubToken = process.env.GITHUB_TOKEN || '';
const args = () => {
    const newArgs = _1.baseArgs();
    newArgs.github.owner = githubOwner;
    newArgs.github.repository = githubRepo;
    newArgs.github.token = githubToken;
    utils_1.trimArgs(newArgs);
    return newArgs;
};
exports.default = args;

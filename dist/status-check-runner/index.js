"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __importDefault(require("child_process"));
const util_1 = require("util");
const github_api_1 = require("../github-api");
const execPromise = util_1.promisify(child_process_1.default.exec);
exports.statusCheck = async (context, command) => {
    let status = 'success';
    let execResults = { stdout: '', stderr: '' };
    await github_api_1.configuredGithubAPI.setGithubStatus(context);
    try {
        execResults = await execPromise(command);
    }
    catch (execResults) {
        status = 'failure';
    }
    await github_api_1.configuredGithubAPI.setGithubStatus(context, status);
    return {
        command,
        context,
        status,
        stderr: execResults.stderr,
        stdout: execResults.stdout,
    };
};

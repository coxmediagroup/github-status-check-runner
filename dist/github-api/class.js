"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rest_1 = __importDefault(require("@octokit/rest"));
const runtime_options_1 = __importDefault(require("../runtime-options"));
const utils_1 = require("../utils");
const token = runtime_options_1.default.github.token;
const defaultStatusParams = {
    context: '',
    description: '',
    owner: runtime_options_1.default.github.owner,
    repo: runtime_options_1.default.github.repository,
    sha: runtime_options_1.default.git.sha,
    state: 'pending',
};
class ConfiguredGithubAPI {
    constructor() {
        this.api = new rest_1.default({
            headers: {
                accept: 'application/vnd.github.v3+json',
                'user-agent': `GitHub Status Checks v${utils_1.getVersion()}`,
            },
        });
        if (token) {
            this.api.authenticate({ token, type: 'token' });
        }
    }
    async setGithubStatus(context, state = 'pending', description = '') {
        const statusParams = Object.assign({}, defaultStatusParams, { context, state });
        if (description) {
            statusParams.description = description;
        }
        if (runtime_options_1.default.other.dryrun) {
            return {
                context,
                status: 'skipped',
            };
        }
        const { data } = await this.api.repos.createStatus(statusParams);
        return { status: data.state };
    }
}
exports.ConfiguredGithubAPI = ConfiguredGithubAPI;

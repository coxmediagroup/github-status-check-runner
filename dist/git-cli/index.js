"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __importDefault(require("child_process"));
const execSyncOpts = {
    encoding: 'utf8',
    stdio: ['inherit', 'pipe', 'ignore'],
};
exports.checkCleanStage = () => {
    const status = child_process_1.default
        .execSync('git status --porcelain', execSyncOpts)
        .toString()
        .trim()
        .split('\n');
    return status;
};
exports.getDefaultCommitHash = () => {
    let gitHead = '';
    try {
        gitHead = child_process_1.default
            .execSync('git rev-parse HEAD', execSyncOpts)
            .toString()
            .trim();
    }
    catch (error) {
        console.warn('No git repo found');
    }
    return gitHead;
};

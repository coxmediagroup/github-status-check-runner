"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runtime_options_1 = __importDefault(require("./runtime-options"));
const status_check_runner_1 = require("./status-check-runner");
const validators_1 = require("./runtime-options/validators");
exports.main = async () => {
    try {
        await validators_1.validateCleanStage();
        const { runCheck: { context, command }, } = await validators_1.validateRuntimeOptions(runtime_options_1.default);
        const summary = await status_check_runner_1.statusCheck(context, command);
        console.log(JSON.stringify(summary, null, 2));
    }
    catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

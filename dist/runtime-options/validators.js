"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_js_1 = __importDefault(require("validate.js"));
const git_cli_1 = require("../git-cli");
const validation_constraints_1 = require("./validation-constraints");
exports.validateRuntimeOptions = async (options) => {
    const issues = validate_js_1.default(options, validation_constraints_1.runtimeOptionsConstraints);
    if (issues) {
        throw new Error(JSON.stringify(issues, null, 2));
    }
    return options;
};
exports.validateCleanStage = async () => {
    const complaints = git_cli_1.checkCleanStage().filter((value) => value);
    if (complaints.length) {
        throw new Error(complaints.join('\n'));
    }
};

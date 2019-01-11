"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.getVersion = () => {
    const packagePath = path_1.default.join(__dirname, '..', '..', 'package.json');
    const packageData = fs_1.default.readFileSync(packagePath, 'utf8');
    try {
        return JSON.parse(packageData).version;
    }
    catch (error) {
        console.warn(error);
        return '';
    }
};

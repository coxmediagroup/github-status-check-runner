"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimArgs = (obj) => {
    Object.entries(obj).forEach(([key, val]) => {
        if (val && typeof val === 'object') {
            exports.trimArgs(val);
        }
        else {
            if (!['number', 'boolean'].includes(typeof val) && !val) {
                delete obj[key];
            }
        }
    });
};

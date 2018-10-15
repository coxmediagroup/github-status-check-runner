import { ghsc } from 'types';

const statusCheckArgsReducer = (acc: ghsc.StatusCheckArgs, cur: string, idx: number, src: string[]) => {
  if (idx % 2 !== 0) {
    const key = src[idx - 1];
    acc[key] = cur;
  }
  return acc;
};

export const parseContextCommands = (contextCommands: string[]): ghsc.StatusCheckArgs => {
  let statusChecks: ghsc.StatusCheckArgs = {};
  return contextCommands.reduce(statusCheckArgsReducer, statusChecks);
};

export const trimArgs = (obj: {[key: string]: any}): void => {
  Object.entries(obj).forEach(([key, val]) => {
    if (val && typeof val === 'object') {
      trimArgs(val);
    } else {
      // Only delete if not a number, nor a boolean, and is falsey
      if (!['number', 'boolean'].includes(typeof val) && !val) {
        delete obj[key];
      }
    }
  });
};

export const trimArgs = (obj: { [key: string]: any }): void => {
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

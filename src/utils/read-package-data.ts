import fs from 'fs';
import path from 'path';

export const getVersion = (): string => {
  const packagePath = path.join(__dirname, '..', '..', 'package.json');
  const packageData = fs.readFileSync(packagePath, 'utf8');
  try {
    return JSON.parse(packageData).version;
  } catch (error) {
    console.warn(error);
    return '';
  }
};

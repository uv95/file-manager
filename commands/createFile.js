import { writeFile } from 'fs/promises';
import { catchError } from '../utils/catchError.js';
import { pathExists } from '../utils/pathExists.js';

export const createFile = (path) =>
  catchError(async () => {
    const fileExists = await pathExists(path);

    if (fileExists) {
      throw new Error('Operation failed');
    }

    await writeFile(path, '');
  });

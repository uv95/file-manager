import { unlink } from 'fs/promises';
import { catchError } from '../utils/catchError.js';
import { pathExists } from '../utils/pathExists.js';

export const deleteFile = (path) =>
  catchError(async () => {
    const fileExists = await pathExists(path);

    if (!fileExists) {
      throw new Error('Operation failed\n');
    }

    await unlink(path);
  });

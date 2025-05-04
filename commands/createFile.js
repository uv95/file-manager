import { writeFile } from 'node:fs/promises';
import { catchError } from '../utils/catchError.js';

export const createFile = (path) =>
  catchError(async () => {
    await writeFile(path, '', { flag: 'wx' });
  });

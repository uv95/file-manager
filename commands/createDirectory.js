import { mkdir } from 'node:fs/promises';
import { catchError } from '../utils/catchError.js';

export const createDirectory = (path) =>
  catchError(async () => {
    await mkdir(path);
  });

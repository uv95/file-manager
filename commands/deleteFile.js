import { unlink } from 'fs/promises';
import { catchError } from '../utils/catchError.js';

export const deleteFile = (path) =>
  catchError(async () => {
    await unlink(path);
  });

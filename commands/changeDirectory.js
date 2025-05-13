import { catchError } from '../utils/catchError.js';

export const changeDirectory = (path) =>
  catchError(() => {
    process.chdir(path);
  });

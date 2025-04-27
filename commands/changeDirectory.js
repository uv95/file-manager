import { catchError } from '../utils/catchError.js';

export const changeDirectory = (path) =>
  catchError(() => {
    console.log('changeDirectory', path);
    process.chdir(path);
  });

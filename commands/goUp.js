import { catchError } from '../utils/catchError.js';

export const goUp = () =>
  catchError(async () => {
    process.chdir('..');
  });

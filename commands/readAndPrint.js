import { pathExists } from '../utils/pathExists.js';
import { catchError } from '../utils/catchError.js';
import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';

export const readAndPrint = (path) =>
  catchError(async () => {
    const isFileExists = await pathExists(path);

    if (!isFileExists) {
      throw new Error('Operation failed');
    }

    const stream = createReadStream(path);
    await pipeline(stream, process.stdout);
  });
